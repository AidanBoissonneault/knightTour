

export class OnlineView {
    setMyId(id) {
        const el = document.getElementById("myId");
        el.value = id;
        el.disabled = true;
    }

    showListening() {
        document.getElementById("connection-status").textContent = "listening";
        document.getElementById("create-button").disabled = true;
    }

    showConnected() {
        document.getElementById("connection-status").textContent = "connected";
        document.getElementById("start-button").disabled = false;
        document.getElementById("connect-button").disabled = true;
        document.getElementById("create-button").disabled = true;
        document.getElementById("remoteId").disabled = true;
    }

    showClosed() {
        document.getElementById("connection-status").textContent = "closed";
        document.getElementById("start-button").disabled = true;
        document.getElementById("connect-button").disabled = false;
        document.getElementById("create-button").disabled = false;
        document.getElementById("remoteId").disabled = false;
    }

    showError(err) {
        alert("Connection error: " + err);
    }
}
