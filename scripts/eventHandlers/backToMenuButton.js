import { createMainMenu } from "../menu-screens/main-menu.js";
import { removeUndoEventListener } from "./undoButton.js";

export function addBackToMenuEventListener() {
    const backToMenu = document.getElementById("back-to-menu-button");
    if (!backToMenu) throw new Error("back to menu document id must exist to create event listeners");

    backToMenu.addEventListener("click", () => {
        removeUndoEventListener();
        createMainMenu();
    });
}