import { gameState } from "../gameState/gameState.js"

export function addUndoEventListener() {
    const undoButton = document.getElementById("undo-button");
    if (!undoButton) return;

    undoButton.addEventListener("click", () => {
        gameState.knight.undo();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "u")
            gameState.knight.undo();
    });
}