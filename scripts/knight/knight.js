import { VisualKnight } from "../visuals/knightVisual.js";
import { gameState } from "../gameState/gameState.js";
import { tileState } from "../tileLogic/tile.js";
import { renderTiles } from "../visuals/tileRenderer.js";
import { removeFailedTiles } from "../visuals/failedGame.js";
import { endGame } from "../gameState/loseGame.js";
import { Timer, TimerHandler } from "../utilities/time.js";

export const knightMoveReference = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

export class Knight {
    #position = { x: 0, y: 0 };

    #visual;
    #timer;
    #timerHandler;
    #previousPositions = [];

    constructor(x, y, documentId = "knight", imageDocumentId = "knight-image", timer = new Timer()) {
        if (x >= gameState.boardSize) throw new Error(`x must be within the board size (0-${gameState.boardSize-1})`);
        if (y >= gameState.boardSize) throw new Error(`y must be within the board size (0-${gameState.boardSize-1})`);
        this.#position = { x, y };
        this.#timer = timer;

        this.#visual = new VisualKnight(x, y, documentId, imageDocumentId, this.#timer);

        const timerId = documentId === "knight" ? "timer-area" : "timer-area2";
        this.#timerHandler = new TimerHandler(this.#timer, timerId);
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

    get timerHandler() {
        return this.#timerHandler;
    }

    move(x, y) {
        if (
            x < 0 || x >= gameState.boardSize ||
            y < 0 || y >= gameState.boardSize
        ) {
            throw new Error("The knight must move in the board");
        }
        if (gameState.tileMap[x][y].state === tileState.VISITED)
            throw new Error("The knight must move to an unvisted square");

        for (const [dx, dy] of knightMoveReference) {
            if (
                this.#position.x + dx === x &&
                this.#position.y + dy === y
            ) {

                this.#previousPositions.push({ 
                    x: this.#position.x, 
                    y: this.#position.y 
                }); // add the current position to the previous moves array before leaving

                gameState.tileMap[this.#position.x][this.#position.y].state = tileState.VISITED;

                this.#position.x = x;
                this.#position.y = y;
                this.#visual.move(x, y);
                console.log(`Moved to X: ${x}, Y:${y}`);
                gameState.tileMap[x][y].state = tileState.VISITING;
                let lostGame = renderTiles();

                if (!lostGame)
                    endGame();

                return;
            }
        }
        throw new Error("The move was not within knights reach");
    }

    undo() {
        if (this.#previousPositions.length === 0) throw new Error("Must have previous moves to use undo");

        const current = { ...this.#position };
        const previous = this.#previousPositions.pop();

        gameState.tileMap[current.x][current.y].state = tileState.UNVISITED;

        // non-validated move
        this.#position.x = previous.x;
        this.#position.y = previous.y;

        const REVERSED = true;
        this.#visual.move(previous.x, previous.y, REVERSED);

        gameState.tileMap[previous.x][previous.y].state = tileState.VISITING;

        renderTiles();
        removeFailedTiles();
    }
}