import { GameMode } from "./gameMode.js";
import { gameControl } from "../../main.js";

// ----------------------------------------
// Standard mode is an 8 x 8 with no 
// incrementation.
// ----------------------------------------

export class StandardMode extends GameMode {

    constructor(modifier = null) {
        const boardSize = 8;
        super(boardSize, modifier);
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