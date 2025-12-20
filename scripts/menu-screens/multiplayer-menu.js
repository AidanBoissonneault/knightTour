import { gameControl, resetGameController } from "../main.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { removeUndoEventListener } from "../eventHandlers/undoButton.js";
import { createMainMenu } from "./main-menu.js";

export async function createMultiplayerMenu() {

    const $ = id => document.getElementById(id);

    const createBtn = $("create-button");
    const connectBtn = $("connect-button");
    const startBtn = $("start-button");

    createBtn.addEventListener("click", () => {
        const myId = $("myId").value.trim();
        gameControl.onlineHandler.createGame(myId);
    });

    connectBtn.addEventListener("click", () => {
        const remoteId = $("remoteId").value.trim();
        gameControl.onlineHandler.connectTo(remoteId);
    });

    startBtn.addEventListener("click", async () => {
        gameControl.onlineHandler.send({type: "start-game"});
        await loadPageFragment("game.html", "actual-body");
        gameControl.startGame();
    });

    const backToMenu = document.getElementById("back-to-menu-button");
        if (!backToMenu) throw new Error("back to menu document id must exist to create event listeners");
    
    backToMenu.addEventListener("click", () => {
        gameControl.onlineHandler.core.disconnect();
        resetGameController();
        removeUndoEventListener();
        createMainMenu();
    });
}