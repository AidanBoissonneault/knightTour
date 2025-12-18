

export function setMultiplayerMenu() {
    const undoButton = document.getElementById("undo-button");
    if (!undoButton) throw new Error("Undo button must exist to hide it");

    undoButton.classList.add("no-display");
}