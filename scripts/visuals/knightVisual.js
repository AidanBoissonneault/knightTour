import { visualTileDimensions } from "./tileVisual.js";
import { gameState } from "../gameState/gameState.js";

export class VisualKnight {
    #position = { x: 0, y: 0 }

    constructor() {}

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    move(x, y) {
        
    }
}