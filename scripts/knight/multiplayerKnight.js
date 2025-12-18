import { Knight } from "./knight.js";
import { gameState } from "../gameState/gameState.js";
import { renderTiles } from "../visuals/tileRenderer.js";
import { winGame } from "../gameState/winGame.js";

export class MultiplayerKnight extends Knight {
    #opponent = null;

    constructor(x, y, documentId = "knight", imageDocumentId = "knight-image") {
        super(x, y, documentId, imageDocumentId);
    }

    set opponent(knight) {
        if (!(knight instanceof MultiplayerKnight)) throw new Error("The opponent must be set to a MultiplayerKnight");
        this.#opponent = knight;
    }

    move(x, y) {
        if (gameState.currentTurn == this.#opponent) return; //throw new Error("It must be your turn to play");
        if (this.#opponent == null) throw new Error("The opponent must be set before making a move");
        super.move(x, y);
        gameState.currentTurn = this.#opponent;
        renderTiles();

        if (this.x === this.#opponent.x &&
            this.y === this.#opponent.y
        ) {
            winGame();
        }
    }
}