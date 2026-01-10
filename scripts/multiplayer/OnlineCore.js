

export class OnlineCore {
    peer = null;
    conn = null;
    myId = "";
    remoteId = "";

    #listeners = {
        open: [],
        data: [],
        close: [],
        error: []
    };

    on(event, cb) {
        if (!this.#listeners[event]) {
            throw new Error(`Unknown event: ${event}`);
        }
        this.#listeners[event].push(cb);
    }

    #emit(event, payload) {
        for (const cb of this.#listeners[event]) cb(payload);
    }

    makeSimpleId() {
        const words = ['cat','dog','fox','owl','bee','bat','cow','ant'];
        return words[Math.floor(Math.random()*words.length)] +
               Math.floor(Math.random()*100);
    }

    async createPeer(myId = null) {
        this.myId = myId || this.makeSimpleId();
        this.peer = new Peer(this.myId);

        this.peer.on("open", id => {
            this.myId = id;
            this.#emit("open", { id });
        });

        this.peer.on("connection", incoming => {
            if (this.conn) {
                incoming.on("open", () => incoming.send({}));
                return;
            }
            this.#setupConnection(incoming);
        });

        this.peer.on("error", err => {
            this.#emit("error", err);
        });
    }

    connect(remoteId) {
        this.remoteId = remoteId;
        const outgoing = this.peer.connect(remoteId, { reliable: true });
        this.#setupConnection(outgoing);
    }

    #setupConnection(connection) {
        this.conn = connection;

        connection.on("open", () => {
            this.#emit("open", { connected: true });
        });

        connection.on("data", data => {
            this.#emit("data", data);
        });

        connection.on("close", () => {
            this.conn = null;
            this.#emit("close");
        });

        connection.on("error", err => {
            this.#emit("error", err);
        });
    }

    send(data) {
        if (this.conn) this.conn.send(data);
    }

    disconnect() {
        if (this.conn && this.conn.open) {
            this.conn.close();
        }

        if (this.peer && !this.peer.destroyed) {
            this.peer.destroy();
        }

        this.conn = null;
        this.peer = null;
    }
}
