import { create } from "zustand";
import WebTransport, { Component } from "~/lib/transport";

export interface GameEditorStore {
  components: Component[];
  link: string;
  iFrameElement: HTMLIFrameElement | null;
  transport: WebTransport;
  addComponent: (kind: Component["kind"]) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => boolean;
  setIFrameElement: (element: HTMLIFrameElement) => void;
  clearIFrameElement: () => void;
  sendKeyboardEvent: (event: KeyboardEvent) => void;
  isGameplayRunning: boolean;
  startGameplay: () => void;
  stopGameplay: () => void;
  generatedCode: string | null;
  setGeneratedCode: (code: string) => void;
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
    const dataUrl = await callRemoteFunction(iFrameElement, screenshotCanvas);
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
    setIFrameElement: (element: HTMLIFrameElement) =>
      set({ iFrameElement: element }),
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
    generatedCode: null,
    setGeneratedCode: (code: string) => set({ generatedCode: code }),
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

async function callRemoteFunction<ReturnType>(
  iFrameElement: HTMLIFrameElement,
  fn: () => ReturnType,
  timeout?: number,
) {
  const functionCode = `(${fn.toString()})()`;
  iFrameElement.contentWindow?.postMessage(functionCode, {
    targetOrigin: "*",
  });
  return new Promise<ReturnType>((resolve, reject) => {
    const messageHandler = (event: MessageEvent) => {
      if (event.source === iFrameElement.contentWindow) {
        resolve(event.data as ReturnType);
        window.removeEventListener("message", messageHandler);
        clearInterval(timeoutId);
      }
    };
    window.addEventListener("message", messageHandler);

    const timeoutId = setInterval(() => {
      window.removeEventListener("message", messageHandler);
      reject(new Error("Function call timed out"));
    }, timeout ?? 5000);
  });
}
