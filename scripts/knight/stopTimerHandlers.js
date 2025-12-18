import { gameState } from "../gameState/gameState.js";

export function stopTimerHandlers() {
    gameState.knight.timerHandler.stopVisualTimer();

    if (gameState.knight2 != null)
        gameState.knight2.timerHandler.stopVisualTimer();
}