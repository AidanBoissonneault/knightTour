import { gameState } from "./gameState.js";
import { tileState } from "../tileLogic/tile.js";

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