import { gameControl } from "../../main.js";
import { LocalMultiplayerMode } from "./localMultiplayerMode.js";

export class OnlineMultiplayerMode extends LocalMultiplayerMode {

    constructor(modifier = null, boardSize = 8) {
        const ONLINE_MODE = true;
        super(modifier, boardSize, ONLINE_MODE);
    }

    /** @override*/
    createEventListeners() {
        const tryAgainId = "try-again-button";
        const tryAgain = document.getElementById(tryAgainId);
        if (!tryAgain) throw new Error(`cannot add event handler to non existent button ${tryAgainId}`);
        
        tryAgain.addEventListener("click", () => {
            gameControl.onlineHandler.send({type: "replay"});
            gameControl.startGame();
        });
    }
}