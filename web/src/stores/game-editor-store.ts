import { create } from "zustand";
import WebTransport, { Component } from "~/lib/transport";

export interface GameEditorStore {
  components: Component[];
  link: string;
  iFrameElement: HTMLIFrameElement | null;
  transport: WebTransport;
  selectingZoneForComponent: string | null; // the id of the component that is currently being selected, or null if no component is selected
  addComponent: (kind: Component["kind"]) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => boolean;
  setIFrameElement: (element: HTMLIFrameElement) => Promise<void>;
  clearIFrameElement: () => void;
  sendKeyboardEvent: (event: KeyboardEvent) => void;
  isGameplayRunning: boolean;
  startGameplay: () => void;
  stopGameplay: () => void;
  startSelectingZone: (id: string) => void;
  cancelSelectingZone: () => void;
  updateSelectingZone: (updates: Component["zone"]) => void;
  canvasTopLeft: { x: number; y: number } | null;
  generatedCode: string | null;
  setGeneratedCode: (code: string) => void;
  screenshotComponentZone: (componentId: string) => Promise<string | null>;
}

interface GameEditorStoreOptions {
  link: string;
  transportUrl: string;
}

export function createGameEditorStore(options: GameEditorStoreOptions) {
  const transport = new WebTransport(options.transportUrl);
  let screenshotLoopId: ReturnType<typeof setInterval> | null = null;

  let disconnected = false;

  // Automatically connect without awaiting
  transport.connect().catch((error) => {
    alert(
      "Failed to connect to transport. Start the server and press ok to refresh the page.",
    );
    disconnected = true;
    window.location.reload();
  });

  transport.onDisconnect(() => {
    if (disconnected) {
      return;
    }
    alert(
      "Disconnected from transport. Start the server and press ok to refresh the page.",
    );
    window.location.reload();
  });

  const takeScreenshot = async (
    iFrameElement: HTMLIFrameElement | null,
  ): Promise<Blob | null> => {
    if (!iFrameElement) {
      return null;
    }
    const dataUrl = await callRemoteFunction(
      iFrameElement,
      screenshotCanvas,
      [],
    );
    if (!dataUrl) {
      return null;
    }
    const response = await fetch(dataUrl);
    if (!response.ok) {
      return null;
    }
    const blob = await response.blob();
    await transport.sendGameFrame(blob);
    return blob;
  };

  const store = create<GameEditorStore>((set, get) => ({
    components: [],
    link: options.link,
    iFrameElement: null,
    transport,
    selectingZoneForComponent: null,
    canvasTopLeft: null,
    addComponent: (kind) => {
      const id = Date.now().toString();
      const color = `#${getColorFromId(id)}`;
      let name = kind !== "ocr" ? kind : "text";
      // count how many components with this name + numbers exist
      const count = get().components.filter((c) =>
        new RegExp(`^${name}\\d*$`).test(c.name),
      ).length;
      name += count > 0 ? `${count + 1}` : "";
      set((state) => ({
        selectingZoneForComponent: id,
        components: [
          ...state.components,
          {
            id,
            color,
            kind,
            name,
            zone: { x: 0, y: 0, width: 100, height: 100 },
            context: "", // Add this line
            label: "", // Add this line
          },
        ],
      }));
    },
    removeComponent: (id) =>
      set((state) => ({
        components: state.components.filter((c) => c.id !== id),
      })),
    updateComponent: (id, updates) => {
      const components = get().components;
      const component = components.find((c) => c.name === updates.name);
      if (component) {
        alert("Component with this name already exists");
        return false;
      }
      set((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, ...updates } : c,
        ),
      }));
      return true; // Return true to indicate successful update
    },
    setIFrameElement: async (element: HTMLIFrameElement) => {
      console.log("Waiting for injected to load");
      await waitForInjectedLoaded(element);
      console.log("Injected loaded");
      const canvasTopLeft = await callRemoteFunction(
        element,
        getCanvasTopLeft,
        [],
      );
      if (!canvasTopLeft) {
        console.error("Failed to get canvas top left");
      } else {
        const iFrameRect = element.getBoundingClientRect();
        set({
          iFrameElement: element,
          canvasTopLeft: {
            x: canvasTopLeft.x + iFrameRect.left,
            y: canvasTopLeft.y + iFrameRect.top,
          },
        });
      }
    },
    clearIFrameElement: () => set({ iFrameElement: null }),
    sendKeyboardEvent: (event: KeyboardEvent) => {
      const { key, type, altKey, ctrlKey, metaKey, shiftKey } = event;
      console.log("Sending keyboard event:", {
        key,
        type,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      });
      transport.sendKeyboardEvent({
        key,
        type,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      });
    },
    isGameplayRunning: false,
    startGameplay: () => {
      set({ isGameplayRunning: true });
      console.log("Gameplay started");
    },
    stopGameplay: () => {
      set({ isGameplayRunning: false });
      console.log("Gameplay stopped");
    },
    startSelectingZone: (id: string) => set({ selectingZoneForComponent: id }),
    cancelSelectingZone: () => set({ selectingZoneForComponent: null }),
    updateSelectingZone: (updates: Component["zone"]) =>
      set((state) => {
        // clamp the zone to the canvas size
        const iFrameRect = state.iFrameElement?.getBoundingClientRect();
        if (!iFrameRect) {
          return state;
        }
        const canvasWidth = iFrameRect.width;
        const canvasHeight = iFrameRect.height;
        const newX = Math.max(
          Math.min(updates.x, canvasWidth - updates.width),
          0,
        );
        const newY = Math.max(
          Math.min(updates.y, canvasHeight - updates.height),
          0,
        );
        const newWidth = Math.max(
          Math.min(
            updates.width - (updates.x - newX),
            canvasWidth - (updates.x - newX),
          ),
          0,
        );
        const newHeight = Math.max(
          Math.min(
            updates.height - (updates.y - newY),
            canvasHeight - (updates.y - newY),
          ),
          0,
        );
        return {
          components: state.components.map((c) =>
            c.id === state.selectingZoneForComponent
              ? {
                  ...c,
                  zone: {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                  },
                }
              : c,
          ),
          selectingZoneForComponent: null, // Disable selecting after updating
        };
      }),
    generatedCode: null,
    setGeneratedCode: (code: string) => set({ generatedCode: code }),
    screenshotComponentZone: async (componentId: string) => {
      const { components, iFrameElement } = get();
      const component = components.find((c) => c.id === componentId);

      if (!component || !iFrameElement) {
        return null;
      }

      const dataUrl = await callRemoteFunction(
        iFrameElement,
        screenshotCanvasZone,
        [component.zone],
      );

      if (!dataUrl) {
        console.error("Failed to take screenshot");
        return null;
      }

      // You can add additional logic here, such as saving the screenshot or sending it to the server
      console.log(`Screenshot taken for component ${componentId}`);

      return dataUrl;
    },
  }));

  // Start the screenshot loop
  const startScreenshotLoop = (fps = 60) => {
    const interval = 1000 / fps;
    screenshotLoopId = setInterval(() => {
      void takeScreenshot(store.getState().iFrameElement);
    }, interval);
  };

  store.subscribe((state, prevState) => {
    state.components.forEach((component) => {
      transport.sendComponentUpdate(component);
    });
    // remove components that were removed
    prevState.components.forEach((component) => {
      if (!state.components.some((c) => c.id === component.id)) {
        transport.sendRemoveComponent(component.id);
      }
    });
    if (prevState.isGameplayRunning !== state.isGameplayRunning) {
      if (state.isGameplayRunning) {
        void transport.sendStartGameplay();
        startScreenshotLoop();
      } else {
        void transport.sendStopGameplay();
        if (screenshotLoopId) {
          clearInterval(screenshotLoopId);
        }
      }
    }
  });

  transport.onGeneratedCode((code: string) => {
    store.getState().setGeneratedCode(code);
  });

  return store;
}

function screenshotCanvas() {
  const canvas = document.getElementsByTagName("canvas")[0];
  if (!canvas) {
    return null;
  }
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}

function screenshotCanvasZone(zone: Component["zone"]) {
  const srcCanvas = document.getElementsByTagName("canvas")[0];
  if (!srcCanvas) {
    return null;
  }
  const dstCanvas = document.createElement("canvas");
  dstCanvas.width = zone.width;
  dstCanvas.height = zone.height;
  const context = dstCanvas.getContext("2d");
  if (!context) {
    return null;
  }
  context.drawImage(
    srcCanvas,
    zone.x,
    zone.y,
    zone.width,
    zone.height,
    0,
    0,
    zone.width,
    zone.height,
  );
  return dstCanvas.toDataURL();
}

function getCanvasTopLeft() {
  const canvas = document.getElementsByTagName("canvas")[0];
  if (!canvas) {
    return null;
  }
  // get the screen space position of the canvas
  const rect = canvas.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

async function callRemoteFunction<
  ArgsType extends JSONValue[],
  ReturnType extends JSONValue,
>(
  iFrameElement: HTMLIFrameElement,
  fn: (...args: ArgsType) => ReturnType,
  args: ArgsType,
  timeout?: number,
) {
  const callId = Math.random().toString(36).substr(2, 9);
  const functionCode = `(${fn.toString()})(${args.map((arg) => JSON.stringify(arg)).join(",")})`;
  console.log(`Calling remote function (${callId})`, functionCode);
  iFrameElement.contentWindow?.postMessage(
    { callId, code: functionCode },
    {
      targetOrigin: "*",
    },
  );
  const functionName = fn.name ?? "anonymous";
  return new Promise<ReturnType>((resolve, reject) => {
    const messageHandler = (event: MessageEvent<unknown>) => {
      if (
        event.source === iFrameElement.contentWindow &&
        typeof event.data === "object" &&
        event.data !== null &&
        "callId" in event.data &&
        typeof event.data.callId === "string" &&
        event.data.callId === callId
      ) {
        if ("result" in event.data) {
          resolve(event.data.result as ReturnType);
        } else if (
          "error" in event.data &&
          typeof event.data.error === "string"
        ) {
          reject(new Error(event.data.error));
        } else {
          reject(
            new Error("Invalid response format " + JSON.stringify(event.data)),
          );
        }
        window.removeEventListener("message", messageHandler);
        clearTimeout(timeoutId);
      }
    };
    window.addEventListener("message", messageHandler);

    const timeoutId = setTimeout(() => {
      window.removeEventListener("message", messageHandler);
      reject(
        new Error(`Function call to ${functionName} (${callId}) timed out`),
      );
    }, timeout ?? 5000);
  });
}

function waitForInjectedLoaded(iFrameElement: HTMLIFrameElement) {
  return new Promise<void>((resolve) => {
    const messageHandler = (event: MessageEvent<unknown>) => {
      if (event.source === iFrameElement.contentWindow) {
        // data format: { injectedLoaded: true }
        if (
          typeof event.data === "object" &&
          event.data !== null &&
          "injectedLoaded" in event.data &&
          typeof event.data.injectedLoaded === "boolean" &&
          event.data.injectedLoaded === true
        ) {
          console.log("DID RECEIVE INJECTED LOADED");
          window.removeEventListener("message", messageHandler);
          resolve();
        }
      }
    };
    window.addEventListener("message", messageHandler);
  });
}

function getColorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
  return color.toString(16).padStart(6, "0");
}
