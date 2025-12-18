import { addFailScreenEventListeners } from "../eventHandlers/failScreen.js";
import { stopTimerHandlers } from "../knight/stopTimerHandlers.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { setRemainingTilesFail } from "../visuals/failedGame.js";
import { gameState } from "./gameState.js";
import { simplifiedCheckWin, winGame } from "./winGame.js";

export async function endGame() {
    if (simplifiedCheckWin()) return; //avoids losing and winning at the same time

    if (gameState.isMultiplayer) { //moves to win screen if "lost" because the other player wins.
        gameState.winner = gameState.currentTurn.opponent;
        winGame();
        return;
    }

    //stop timer
    stopTimerHandlers();

    setRemainingTilesFail();
    await loadPageFragment("overlay-screens/fail.html", "overlay-screen-container");

    addFailScreenEventListeners();
}