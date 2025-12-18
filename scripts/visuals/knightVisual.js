import { visualTileDimensions, visualTileDimensionsBase } from "./tileVisual.js";
import { gameState } from "../gameState/gameState.js";
import { forceReflow } from "../utilities/forceReflow.js";
import { TimerHandler } from "../utilities/time.js";

let visualKnightVerticalOffset = -40; //amount raised from the tile default

export function setVisualKnightVerticalOffset(value) {
    visualKnightVerticalOffset = value;
}

export class VisualKnight {
    #position = { x: 0, y: 0 }
    #documentElement;
    #imageDocumentElement;

    #timer;
    #visualTimerHandler;

    constructor(x, y, documentId, imageDocumentId, timer) {
        this.#documentElement = document.getElementById(documentId);
        this.#imageDocumentElement = document.getElementById(imageDocumentId);
        this.#documentElement.style.setProperty("--x", visualTileDimensions.sizeX * x);
        this.#documentElement.style.setProperty("--y", visualTileDimensions.sizeY * y + visualKnightVerticalOffset);

        const size = visualTileDimensions.sizeX;
        this.#documentElement.style.setProperty("--size", size);

        this.#timer = timer;
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

    get visualTimerHandler() {
        return this.#visualTimerHandler;
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
            visualTileDimensions.sizeY * y + visualKnightVerticalOffset
        );
    }
}