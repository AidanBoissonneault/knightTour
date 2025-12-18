import { gameState } from "./gameState.js";
import { tileState } from "../tileLogic/tile.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { gameControl } from "../main.js";
import { setRemainingTilesFail } from "../visuals/failedGame.js";
import { stopTimerHandlers } from "../knight/stopTimerHandlers.js";

export function checkWin(skipX, skipY) {
    for (const column of gameState.tileMap) {
        for (const tile of column) {
            if (tile.state === tileState.UNVISITED && tile.x !== skipX && tile.y !== skipY) {
                console.log(`No win because of X${tile.x} Y${tile.y}`);
                return false;
            }
        }
    }
    return true;
}

export async function winGame() {
    await loadPageFragment("overlay-screens/win.html", "overlay-screen-container");
    gameControl.mode.createRelevantWinButtons("button-outer-container");

    //stop timer
    stopTimerHandlers();

    if (gameState.isMultiplayer) {
        const winText = document.getElementById("win-text");
        if (!winText) throw new Error("win text must exist to replace it");
        const winMessage = gameState.winner == gameState.knight ? "LIGHT KNIGHT WINS" : "DARK KNIGHT WINS";
        winText.innerHTML = winMessage;

        gameState.winner.opponent.visual.documentElement.classList.add("no-display"); //visually deletes the opponent
        
        //explode all tiles but for the one the winner is standing on
        if (gameState.knight.x === gameState.knight2.x &&
            gameState.knight.y === gameState.knight2.y
        ) { } else {
            const loser = gameState.winner.opponent;
            gameState.tileMap[loser.x][loser.y].state = tileState.UNVISITED;
        }
        setRemainingTilesFail();
    }
}

//will change all current win implementation to this in the future
export function simplifiedCheckWin() {
    const visitedTiles = document.querySelectorAll(".visited, .visiting");
    if (visitedTiles.length >= gameState.boardSize ** 2)
        return true;
    return false;
}