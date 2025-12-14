import { generateMap } from "../tileLogic/gridGenerator.js"
import { Knight } from "../knight/knight.js";

export const gameState = {
    boardSize: 5, // 5 is min smallest knights tour
    tileMap: null,

    knight: new Knight()
};