import { visualTileDimensions } from "./tileVisual.js";
import { gameState } from "../gameState/gameState.js";
import { forceReflow } from "../utilities/forceReflow.js";

const VISUAL_KNIGHT_VERTICAL_OFFSET = -40;
export class VisualKnight {
    #position = { x: 0, y: 0 }
    #facing = 1; //1 = right, -1 = left
    #documentElement;
    #imageDocumentElement;

    constructor(x, y) {
        this.#documentElement = document.getElementById("knight");
        this.#imageDocumentElement = document.getElementById("knight-image");
        this.#documentElement.style.setProperty("--x", visualTileDimensions.sizeX * x);
        this.#documentElement.style.setProperty("--y", visualTileDimensions.sizeY * y + VISUAL_KNIGHT_VERTICAL_OFFSET);
    }

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    get documentElement() {
        return this.#documentElement;
    }

    move(x, y, isReversed = false) {
        const dx = x - this.#position.x;

        // facing logic
        if (dx !== 0) {
            let left = "180deg";
            let right = "0deg";

            if (isReversed) [left, right] = [right, left];
            const facing = dx > 0 ? right : left;
            this.#documentElement.style.setProperty("--facing", facing);
        }

        // trigger jump (restart animation)
        const jump = "jump"; //stores the class associated with jumping forward
        const jumpReverse = "jump-reverse"; //stores the class associated with jumping backwards
        const jumpClass = isReversed ? jumpReverse : jump;
        this.#imageDocumentElement.classList.remove(jumpReverse, jump);
        forceReflow(this.#imageDocumentElement);
        this.#imageDocumentElement.classList.add(jumpClass);

        // update position
        this.#position.x = x;
        this.#position.y = y;

        this.#documentElement.style.setProperty(
            "--x",
            visualTileDimensions.sizeX * x
        );
        this.#documentElement.style.setProperty(
            "--y",
            visualTileDimensions.sizeY * y + VISUAL_KNIGHT_VERTICAL_OFFSET
        );
    }
}