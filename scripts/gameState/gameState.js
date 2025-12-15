import { generateMap } from "../tileLogic/gridGenerator.js"
import { Knight } from "../knight/knight.js";

export const gameState = {
    boardSize: 8, // 5 is min smallest knights tour
    tileMap: null,

    knight: new Knight(0, 0) //x, y pass in.
};