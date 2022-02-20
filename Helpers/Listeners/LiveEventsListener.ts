import EventEmitter from "events";
import { io, Socket } from "socket.io-client";
import APIClient from "../../Global/APIClient";
import EliminationToken from "../../Global/ElimAPIClient";
import { APIDOMAIN } from "../constants";
export class LiveEventsListenerBase extends EventEmitter {
  static self: LiveEventsListenerBase;
  socket!: Socket;
  ready: boolean = false;
  static getInstance() {
    if (!LiveEventsListenerBase.self) {
      LiveEventsListenerBase.self = new LiveEventsListenerBase();
    }
    return LiveEventsListenerBase.self;
  }
  constructor() {
    super();
    this.init();
  }
  async init() {
    this.socket = io(APIDOMAIN, {
      extraHeaders: {
        Authorization: (await EliminationToken)!,
      },
    }).on("connect", () => {
      this.ready = true;
    });
    this.socket.onAny((event, ...args) => {
      console.log("[LiveEventsListener]", event, ...args);
      this.emit(event, ...args);
    });
  }
  async waitForReady(minDelay: number = 100) {
    while (!this.ready) {
      await new Promise((resolve) => setTimeout(resolve, minDelay));
    }
  }
}
export const LiveEventsListener = LiveEventsListenerBase.getInstance();
export default LiveEventsListener;
