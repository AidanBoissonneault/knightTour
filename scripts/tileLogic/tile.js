import { VisualTile } from "../visuals/tileVisual.js";

export class Tile {
    #position = {
        x: 0,
        y: 0
    };
    #visited;
    #visual; //stores a VisualTile object

    constructor(x, y) {
        if ( x == null || y == null ) throw new Error("X and Y cannot be null/undefined");
        this.x = x;
        this.y = y;
        this.#visited = false;

        this.#visual = new VisualTile(x, y);
    }
    
    get position() {
        return this.#position;
    }

    set visited(state) {
        if (state == null ) throw new Error("A state cannot be null/undefined");
        this.#visited = state;
    }

    get visited() {
        return this.#visited;
    }

    get visual() {
        return this.#visual;
    }
}