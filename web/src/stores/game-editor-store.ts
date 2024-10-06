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
    addComponent: (kind) =>
      set((state) => ({
        components: [
          ...state.components,
          {
            id: Date.now().toString(),
            kind,
            context: `New ${kind}`,
            zone: { x: 0, y: 0, width: 100, height: 100 },
          },
        ],
      })),
    removeComponent: (id) =>
      set((state) => ({
        components: state.components.filter((c) => c.id !== id),
      })),
    updateComponent: (id, updates) => {
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
        console.log("DID GET CANVAS TOP LEFT");
      }
      set({ iFrameElement: element, canvasTopLeft });
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
      set((state) => ({
        components: state.components.map((c) =>
          c.id === state.selectingZoneForComponent
            ? { ...c, zone: updates }
            : c,
        ),
        selectingZoneForComponent: null, // Disable selecting after updating
      })),
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
        if (
          "result" in event.data &&
          typeof event.data.result === "object" &&
          event.data.result !== null
        ) {
          resolve(event.data.result as ReturnType);
        } else if (
          "error" in event.data &&
          typeof event.data.error === "string"
        ) {
          reject(new Error(event.data.error));
        } else {
          reject(new Error("Invalid response format"));
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
