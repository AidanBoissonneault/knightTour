import { gameControl } from "../main.js";

/**
 * Simple function that adds an event listener to
 * a document element with the id: "try-again-button"
 * the button restarts the game.
 */

export function addFailScreenEventListeners() {
    const tryAgainId = "try-again-button";
    const tryAgain = document.getElementById(tryAgainId);
    if (!tryAgain) throw new Error(`cannot add event handler to non existent button ${tryAgainId}`);

    tryAgain.addEventListener("click", () => {
        gameControl.startGame();
    });
}