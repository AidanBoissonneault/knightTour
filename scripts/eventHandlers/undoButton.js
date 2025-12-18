import { gameState } from "../gameState/gameState.js"

const onUndoKeydown = function (event) {
    // does not allow keydown whilst an overlay screen is displayed
    const overlayScreen = document.getElementById("overlay-screen-container");
    if (!overlayScreen) return;
    if (!overlayScreen.classList.contains("no-display")) return;

    if (event.key === "u") {
        gameState.knight.undo();
    }
}

/**
 * Adds two event listeners:
 * 1: on click of documentId "undo-button"s element.
 * 2: on pressing u
 * the keybind for u can be disabled with removeUndoEventListener()
 */
export function addUndoEventListener() {
    const undoButton = document.getElementById("undo-button");
    if (!undoButton) throw new Error("Undo button must exist to add event listeners");

    undoButton.addEventListener("click", () => {
        gameState.knight.undo();
    });
    removeUndoEventListener();
    document.addEventListener("keydown", onUndoKeydown);
}

/**
 * removes the keybind 'u' from the keyboard for the knights undo.
 */
export function removeUndoEventListener() {
    document.removeEventListener("keydown", onUndoKeydown);
}