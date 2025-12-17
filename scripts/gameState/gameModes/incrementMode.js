import { GameMode } from "./gameMode.js";
import { gameControl } from "../../main.js";

export class IncrementMode extends GameMode {

    constructor(modifier = null) {
        const boardSize = 5;
        super(boardSize, modifier);
        this.buttonHTML = 
                            `
                            <div class="button-container"><button 
                                id="increment-button" 
                                class="menu-button" 
                                style="--content:'INCREMENT';">
                            </button></div>

                            <div class="button-container"><button 
                                id="try-again-button" 
                                class="menu-button" 
                                style="--content:'REPLAY';">
                            </button></div>`;
    }

    #incrementBoardSize() {
        this._boardSize = this.boardSize + 1;
    }

    /** @override*/
    createEventListeners() {
        const tryAgainId = "try-again-button";
        const tryAgain = document.getElementById(tryAgainId);
        if (!tryAgain) throw new Error(`cannot add event handler to non existent button ${tryAgainId}`);

        const incrementId = "increment-button";
        const increment = document.getElementById(incrementId);
        if (!increment) throw new Error(`cannot add event handler to non existent button ${incrementId}`);
        
        tryAgain.addEventListener("click", () => {
            gameControl.startGame();
        });

        increment.addEventListener("click", () => {
            this.#incrementBoardSize();
            gameControl.startGame();
        });


    }
}