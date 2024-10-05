export interface Component {
  id: string;
  kind: "ocr" | "movement" | "sprite";
  context: string;
  zone: { x: number; y: number; width: number; height: number };
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
    });
  }

  onDisconnect(callback: () => void) {
    this.onDisconnectCallback = callback;
  }

  async sendGameFrame(blob: Blob) {
    console.log("sending game frame...");
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
      this.socket.send(JSON.stringify({ type, ...data }));
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
}

export default WebTransport;
