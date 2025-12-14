import { visualTileDimensions } from "./tileVisual.js";
import { gameState } from "../gameState/gameState.js";

const VISUAL_KNIGHT_VERTICAL_OFFSET = -40;
export class VisualKnight {
    #position = { x: 0, y: 0 }
    #facing = 1; //1 = right, -1 = left
    #documentId;
    #imageDocumentId;

    constructor() {
        this.#documentId = document.getElementById("knight");
        this.#imageDocumentId = document.getElementById("knight-image");
        this.#documentId.style.setProperty("--x", 0);
        this.#documentId.style.setProperty("--y", + VISUAL_KNIGHT_VERTICAL_OFFSET);
    }

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    get documentId() {
        return this.#documentId;
    }

    move(x, y) {
    const dx = x - this.#position.x;

    // facing logic
    if (dx !== 0) {
        const facing = dx > 0 ? "0deg" : "180deg";
        this.#documentId.style.setProperty("--facing", facing);
    }

    // trigger jump (restart animation)
    this.#imageDocumentId.classList.remove("jump");
    void this.#imageDocumentId.offsetWidth; // force reflow
    this.#imageDocumentId.classList.add("jump");

    // update position
    this.#position.x = x;
    this.#position.y = y;

    this.#documentId.style.setProperty(
        "--x",
        visualTileDimensions.sizeX * x
    );
    this.#documentId.style.setProperty(
        "--y",
        visualTileDimensions.sizeY * y + VISUAL_KNIGHT_VERTICAL_OFFSET
    );
}


}