import { createMainMenu } from "../menu-screens/main-menu.js";
import { removeUndoEventListener } from "./undoButton.js";


/**
 * Simple function that adds an event listener to
 * a document element with the ID "back-to-menu-button"
 * the button removes the keybind for undo and
 * brings the game back to the main menu.
 */
export function addBackToMenuEventListener() {
    const backToMenu = document.getElementById("back-to-menu-button");
    if (!backToMenu) throw new Error("back to menu document id must exist to create event listeners");

    backToMenu.addEventListener("click", () => {
        removeUndoEventListener();
        createMainMenu();
    });
}