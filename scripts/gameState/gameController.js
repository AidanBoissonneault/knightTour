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
import { OnlineKnight } from "../knight/onlineKnight.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { stopTimerHandlers } from "../knight/stopTimerHandlers.js";

export class GameController {

    #madeEventListeners = false;
    #mode = null;
    #onlineHandler = null;

    constructor(mode, onlineHandler = null) {
        this.#mode = mode;
        this.#onlineHandler = onlineHandler;
    }

    get mode() {
        return this.#mode;
    }

    get onlineHandler() {
        return this.#onlineHandler;
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

        gameState.isOnline = this.#onlineHandler == null ? false : true;

        //creates game
        gameState.boardSize = this.#mode.boardSize;

        setVisualTileDimensions();

        resetBoard();

        createKnights(this.#mode);
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
            document.getElementById("knight-info").classList.remove("only-player");
            document.getElementById("knight-info2").classList.remove("no-display");
            document.getElementById("current-turn").innerHTML = "Current Turn";
            document.getElementById("current-turn2").innerHTML = "";
            document.getElementById("timer-area2").innerHTML = "3:00";
        } else {
            document.getElementById("knight-info2").classList.add("no-display");
            document.getElementById("knight-info").classList.add("only-player");
        }
    }

    async handleNetworkEvent(data) {
        const FROM_NETWORK = true;
        if (data.type === "move") {
            const payload = data.payload;
            gameState.currentTurn.move(payload.posX, payload.posY, FROM_NETWORK);
        } else if (data.type === "start-game") {
            await loadPageFragment("game.html", "actual-body");
            this.startGame();
        } else if (data.type === "replay") {
            stopTimerHandlers();
            this.startGame();
        }
    }
}

function createKnights(mode) {
    if (!gameState.isMultiplayer) {
        gameState.knight = new Knight(
            mode.startingX,
            mode.startingY
        );
    } else if (gameState.isOnline) {
        gameState.knight = new OnlineKnight(
            1, 0,
            "knight", "knight-image"
        )
        gameState.knight2 = new OnlineKnight(
            6, 7,
            "knight2", "knight-image2"
        )
        console.log("online knights made");
    } else if (gameState.isMultiplayer) {
        gameState.knight = new MultiplayerKnight(
            /*this.#mode.startingX*/1,
            /*this.#mode.startingY*/0,
            "knight",
            "knight-image"
        )
        gameState.knight2 = new MultiplayerKnight(
            /*this.#mode.boardSize-1*/6,
            /*this.#mode.boardSize-1*/7,
            "knight2",
            "knight-image2"
        )
    }
    if (gameState.isMultiplayer) {
        gameState.knight.opponent = gameState.knight2;
        gameState.knight2.opponent = gameState.knight;   
    }
    gameState.currentTurn = gameState.knight;
}