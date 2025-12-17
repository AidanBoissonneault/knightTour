import { GameMode } from "./gameMode.js";

// ----------------------------------------
// Standard mode is an 8 x 8 with no 
// incrementation.
// ----------------------------------------

export class StandardMode extends GameMode {

    constructor(modifier) {
        const boardSize = 8;
        super(boardSize, modifier);
        this.buttonHTML = 
                            `<div class="button-container"><button 
                                id="try-again-button" 
                                class="menu-button" 
                                style="--content:'REPLAY';">
                            </button></div>`;
    }

    get startingBoardSize() {
        return super._boardSize;
    }

    get boardSize() {
        return super._boardSize;
    }

    /** @override @protected */
    createEventListeners() {
        const tryAgainId = "try-again-button";
        const tryAgain = document.getElementById(tryAgainId);
        if (!tryAgain) throw new Error(`cannot add event handler to non existent button ${tryAgainId}`);
        
        tryAgain.addEventListener("click", () => {
            GameController.startGame();
        });
    }
};