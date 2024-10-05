import { EventEmitter } from "events";

export interface Component {
  id: string;
  kind: "ocr" | "movement" | "sprite";
  context: string;
  zone: { x: number; y: number; width: number; height: number };
}

interface UserEvent {
  action: string;
  [key: string]: any;
}

class WebTransport {
  private socket: WebSocket | null = null;

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
        reject(error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    });
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
    this.sendMessage("component_update", { component });
  }

  sendUserEvent(event: UserEvent) {
    this.sendMessage("user_event", { event });
  }

  private sendMessage(type: string, data: any) {
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
