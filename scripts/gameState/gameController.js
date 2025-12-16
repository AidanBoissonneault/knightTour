import { gameState } from "./gameState.js";
import { renderBoard, resetBoard } from "../visuals/tileRenderer.js";
import { addRulesBox } from "../eventHandlers/rules.js";
import { addUndoEventListener } from "../eventHandlers/undoButton.js"
import { Knight } from "../knight/knight.js";
import { hideOverlayScreen } from "./removeOverlayScreen.js";

export class GameController {

    static #boardSizeStarter = 5;
    static #madeEventListeners = false;

    static startGame() {
        //reset
        gameState.tileMap = null;
        gameState.knight = null;

        //creates game
        gameState.boardSize = this.#boardSizeStarter;

        resetBoard();

        const startingX =
            this.#boardSizeStarter > 5 ?
            Math.floor(Math.random() * gameState.boardSize) :
            0;
        const startingY = 
            this.#boardSizeStarter > 5 ?
            Math.floor(Math.random() * gameState.boardSize) :
            0;
        gameState.knight = new Knight(
            startingX,
            startingY
        );
        
        renderBoard();

        //menu controlling
        if (!this.#madeEventListeners) {
            this.#madeEventListeners = true;
            addRulesBox();
            addUndoEventListener();
        }

        hideOverlayScreen();
    }

    static incrementBoardSize() {
        this.#boardSizeStarter++;
    }
}