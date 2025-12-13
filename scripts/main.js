//import { gameState } from "./gameState/gameState.js"
import { renderBoard } from "./visuals/tileRenderer.js"
import { Knight } from "./knight/knight.js";


let knight = new Knight();
renderBoard(knight);