import { gameState } from "./gameState.js";
import { renderBoard, resetBoard } from "../visuals/tileRenderer.js";

import { addRulesBox } from "../eventHandlers/rules.js";
import { addUndoEventListener, removeUndoEventListener } from "../eventHandlers/undoButton.js"
import { addBackToMenuEventListener } from "../eventHandlers/backToMenuButton.js";
import { addSettingsEventListener } from "../eventHandlers/settingsButton.js";

import { Knight } from "../knight/knight.js";
import { MultiplayerKnight } from "../knight/multiplayerKnight.js";
import { hideOverlayScreen } from "./removeOverlayScreen.js";
import { setVisualTileDimensions } from "../visuals/tileVisual.js";
import { setMultiplayerMenu } from "./setMultiplayerMenu.js";


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
        
        //reset multiplayer vars
        gameState.isMultiplayer = this.#mode.multiplayer;
        gameState.knight2 = null;
        gameState.currentTurn = null;
        gameState.winner = null;

        //creates game
        gameState.boardSize = this.#mode.boardSize;

        setVisualTileDimensions();

        resetBoard();

        if (!gameState.isMultiplayer) {
            gameState.knight = new Knight(
                this.#mode.startingX,
                this.#mode.startingY
            );
        } else {
            const STARTING_TURN = true;
            gameState.knight = new MultiplayerKnight(
                this.#mode.startingX,
                this.#mode.startingY,
                "knight",
                "knight-image"
            )
            gameState.knight2 = new MultiplayerKnight(
                this.#mode.boardSize-1,
                this.#mode.boardSize-1,
                "knight2",
                "knight-image2"
            )
            gameState.knight.opponent = gameState.knight2;
            gameState.knight2.opponent = gameState.knight;      
        }
        gameState.currentTurn = gameState.knight;
        gameState.currentTurn.timerHandler.startVisualTimer();
        
        renderBoard();

        //menu controlling
        if (!this.#madeEventListeners) {
            this.#madeEventListeners = true;
            addRulesBox();
            addUndoEventListener();
            addBackToMenuEventListener();
            addSettingsEventListener();
        }

        hideOverlayScreen();

        //remove elements of the UI not required for multiplayer
        if (gameState.isMultiplayer) {
            setMultiplayerMenu();
            removeUndoEventListener(); //removes the keybind for undo
        }
    }
}