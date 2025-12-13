import { VisualKnight } from "../visuals/knightVisual.js";
import { gameState } from "../gameState/gameState.js";
import { tileState } from "../tileLogic/tile.js";
import { renderTiles } from "../visuals/tileRenderer.js";

export const knightMoveReference = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

export class Knight {
    #position = { x: 0, y: 0 };

    #visual;

    constructor() {
        this.#visual = new VisualKnight();
    }

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    get visual() {
        return this.#visual;
    }

    move(x, y) {
        if (x < 0 || x >= gameState.boardSize ||
            y < 0 || y >= gameState.boardSize
        ) {
            throw new Error("The knight must move in the board");
        }
        if (gameState.tileMap[x][y].state === tileState.VISITED)
            throw new Error("The knight must move to an unvisted square");

        for (const [dx, dy] of knightMoveReference) {
            if (this.#position.x + dx === x &&
                this.#position.y + dy === y) {

                gameState.tileMap[this.#position.x][this.#position.y].state = tileState.VISITED;

                this.#position.x = x;
                this.#position.y = y;
                this.#visual.move(x, y);
                console.log(`Moved to X: ${x}, Y:${y}`);
                gameState.tileMap[x][y].state = tileState.VISITING;
                renderTiles(this);
                return;
            }
        }
        //throw new Error("The move was not within knights reach");
    }
}