import { OnlineCore } from "./OnlineCore.js";
import { OnlineView } from "./OnlineView.js";
import { gameControl } from "../main.js";

export class OnlineHandler {

    isHost = false;
    constructor(core = new OnlineCore(), view = new OnlineView()) {
        if (!(core instanceof OnlineCore)) throw new Error("core must be an onlineCore");
        if (!(view instanceof OnlineView)) throw new Error("view must be an instance of OnlineView");
        this.core = core;
        this.view = view;

        core.on("open", e => this.onOpen(e));
        core.on("data", data => this.onData(data));
        core.on("close", () => view.showClosed());
        core.on("error", err => view.showError(err));
    }

    async createGame(myIdInput) {
        await this.core.createPeer(myIdInput);
        this.view.setMyId(this.core.myId);
        this.view.showListening();

        this.isHost = true;
    }

    async connectTo(remoteId) {
        if (!this.core.peer) {
            await this.core.createPeer();
            this.view.setMyId(this.core.myId);
        }
        this.core.connect(remoteId);
        this.isHost = false;
    }

    onOpen(e) {
        if (e.connected) {
            this.view.showConnected();
        }
    }

    onData(data) {
        gameControl.handleNetworkEvent(data);
    }

    send(data) {
        this.core.send(data);
    }
}
