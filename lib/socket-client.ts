import io, { Socket } from "socket.io-client";
import { EventEmitter } from "events";

interface SocketConfig {
  url: string;
  token?: string;
}

export default class SocketIoClient extends EventEmitter {
  private socket: Socket | null;
  private config: SocketConfig;
  private namespaces: Record<string, Socket> = {};

  constructor(config: SocketConfig) {
    super();
    this.config = config;
    this.socket = null;
    this._connect();
  }
  private _connect() {
    this.socket = io(this.config.url, this._getDefaultOptions());

    this.socket.on("connect", () => {
      this.emit("connect", this.socket);
    });

    this.socket.on("disconnect", (reason: string) => {
      this.emit("disconnect", reason);
    });

    this.socket.on("connect_error", (error: Error) => {
      console.error(error.message);
    });
  }

  private _getDefaultOptions() {
    return {
      autoConnect: true,
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        token: this.config.token,
      },
    };
  }
  get connected(): boolean {
    return !!this.socket && this.socket.connected;
  }

  get userId(): string | undefined {
    return this.socket?.id;
  }
  subscribe(event: string, callback: Function) {
    this.socket?.on(event, (arg) => callback(arg));
  }

  send<T>(event: string, data: T) {
    this.socket?.emit(event, data);
  }

  private namespace(namespace: string): Socket {
    if (!this.namespaces[namespace]) {
      this.namespaces[namespace] = io(`${this.config.url}/${namespace}`, {
        ...this._getDefaultOptions(),
      });
    }
    return this.namespaces[namespace];
  }
  subscribeToNamespace(namespace: string, event: string, callback: Function) {
    const ns = this.namespace(namespace);
    ns.on(event, (arg) => callback(arg));
  }
  sendToNamespace<T>(namespace: string, event: string, data: T) {
    const ns = this.namespace(namespace);
    ns.emit(event, data);
  }
  disconnectNamespace(namespace: string) {
    const ns = this.namespaces[namespace];
    if (ns) {
      ns.disconnect();
      delete this.namespaces[namespace];
    }
  }
}
