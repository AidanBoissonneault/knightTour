import { gameState } from "./gameState.js";
import { renderBoard, resetBoard } from "../visuals/tileRenderer.js";
import { addRulesBox } from "../eventHandlers/rules.js";
import { addUndoEventListener } from "../eventHandlers/undoButton.js"
import { Knight } from "../knight/knight.js";
import { hideOverlayScreen } from "./removeOverlayScreen.js";

import { StandardMode } from "./gameModes/standardMode.js";
import { IncrementMode } from "./gameModes/incrementMode.js";

import { RandomStartModifier } from "./gameModes/RandomStartModifier.js";


export class GameController {

    #madeEventListeners = false;
    #mode = null;

    constructor(mode) {
        this.#mode = mode;
    }

    get mode() {
        return this.#mode;
    }

    startGame() {
        //reset
        gameState.tileMap = null;
        gameState.knight = null;

        //creates game
        gameState.boardSize = this.#mode.boardSize;

        resetBoard();

        gameState.knight = new Knight(
            this.#mode.startingX,
            this.#mode.startingY
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
}