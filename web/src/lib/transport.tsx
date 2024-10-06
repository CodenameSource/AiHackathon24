export interface Component {
  id: string;
  kind: "ocr" | "movement" | "sprite";
  context: string;
  zone: { x: number; y: number; width: number; height: number };
  color: string; // Add this line
}

interface UserEvent {
  action: string;
  data: object;
}

interface KeyboardEvent {
  key: string;
  type: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

class WebTransport {
  private socket: WebSocket | null = null;
  private onDisconnectCallback: (() => void) | null = null;
  private onGeneratedCodeCallback: ((code: string) => void) | null = null;

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket connection established");
        resolve();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(new Error(JSON.stringify(error)));
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
        if (this.onDisconnectCallback) {
          this.onDisconnectCallback();
        }
      };

      this.socket.onmessage = (event: MessageEvent<unknown>) => {
        if (typeof event.data !== "string") {
          console.error("Received non-string data in onmessage");
          return;
        }
        const data = JSON.parse(event.data) as unknown;
        if (
          typeof data === "object" &&
          data !== null &&
          "type" in data &&
          data.type === "generated_code" &&
          "payload" in data &&
          typeof data.payload === "string" &&
          this.onGeneratedCodeCallback
        ) {
          this.onGeneratedCodeCallback(data.payload);
        }
      };
    });
  }

  onDisconnect(callback: () => void) {
    this.onDisconnectCallback = callback;
  }

  async sendGameFrame(blob: Blob) {
    const base64 = await this.blobToBase64(blob);
    this.sendMessage("game_frame", { payload: base64 });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  sendComponentUpdate(component: Component) {
    // The color property will be automatically included in the component object
    this.sendMessage("component_update", { component });
  }

  sendRemoveComponent(componentId: string) {
    this.sendMessage("remove_component", { component_id: componentId });
  }

  sendUserEvent(event: UserEvent) {
    this.sendMessage("user_event", { event });
  }

  sendKeyboardEvent(event: KeyboardEvent) {
    this.sendMessage("keyboard_event", { event });
  }

  private sendMessage(type: string, data: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const timestamp = Date.now();
      this.socket.send(JSON.stringify({ type, timestamp, ...data }));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public async sendStartGameplay(): Promise<void> {
    this.sendMessage("start_gameplay", {});
  }

  public async sendStopGameplay(): Promise<void> {
    this.sendMessage("stop_gameplay", {});
  }

  onGeneratedCode(callback: (code: string) => void) {
    this.onGeneratedCodeCallback = callback;
  }
}

export default WebTransport;
