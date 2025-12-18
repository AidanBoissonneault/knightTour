import { GameMode } from "./gameMode.js";
import { gameControl } from "../../main.js";

export class LocalMultiplayerMode extends GameMode {

    constructor(modifier = null, boardSize = 8) {
        const MULTIPLAYER_MODE = true;
        super(boardSize, modifier, MULTIPLAYER_MODE);
        this.buttonHTML = 
                            `<div class="button-container"><button 
                                id="try-again-button" 
                                class="menu-button" 
                                style="--content:'REPLAY';">
                            </button></div>`;
    }

    /** @override*/
    createEventListeners() {
        const tryAgainId = "try-again-button";
        const tryAgain = document.getElementById(tryAgainId);
        if (!tryAgain) throw new Error(`cannot add event handler to non existent button ${tryAgainId}`);
        
        tryAgain.addEventListener("click", () => {
            gameControl.startGame();
        });
    }
};