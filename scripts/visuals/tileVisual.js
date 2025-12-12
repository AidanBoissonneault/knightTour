export const visualTileDimensions = Object.freeze({
    sizeX: 85,
    sizeY: 75
});

export class VisualTile {
    #offsetX;
    #offsetY;

    constructor(x, y) {
        if ( x == null || y == null ) throw new Error("You must input an X and Y");
        this.#offsetX = visualTileDimensions.sizeX * x;
        this.#offsetY = visualTileDimensions.sizeY * y; 
    }

    get offsetX() {
        return this.#offsetX;
    }

    get offsetY() {
        return this.#offsetY;
    }
};