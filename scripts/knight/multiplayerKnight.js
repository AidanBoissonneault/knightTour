import { Knight } from "./knight.js";
import { gameState } from "../gameState/gameState.js";
import { renderTiles } from "../visuals/tileRenderer.js";
import { winGame } from "../gameState/winGame.js";
import { CountdownTimer } from "../utilities/time.js";

export class MultiplayerKnight extends Knight {
    #opponent = null;

    constructor(x, y, documentId = "knight", imageDocumentId = "knight-image", timer = new CountdownTimer(180000 /* 3 minutes */)) {
        super(x, y, documentId, imageDocumentId, timer);
    }

    set opponent(knight) {
        if (!(knight instanceof MultiplayerKnight)) throw new Error("The opponent must be set to a MultiplayerKnight");
        this.#opponent = knight;
    }

    get opponent() {
        return this.#opponent;
    }

    /** @override */
    move(x, y) {
        if (gameState.currentTurn == this.#opponent) return; //throw new Error("It must be your turn to play");
        if (this.#opponent == null) throw new Error("The opponent must be set before making a move");
        super.move(x, y);
        gameState.currentTurn = this.#opponent;

        //make the current timer the opponents timer and stop your own
        this.timerHandler.stopVisualTimer();

        renderTiles();

        if (this.x === this.#opponent.x &&
            this.y === this.#opponent.y
        ) {
            gameState.winner = this;
            winGame();
        } else {
            this.opponent.timerHandler.startVisualTimer();
        }

        this.visual.toggleCurrentTurn();
        this.opponent.visual.toggleCurrentTurn();
    }
}