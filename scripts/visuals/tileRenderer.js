import { gameState } from "../gameState/gameState.js";
import { generateMap } from "../tileLogic/gridGenerator.js";
import { visualTileDimensions } from "./tileVisual.js";

export function renderBoard() {
    if (gameState.tileMap == null) {
        gameState.tileMap = generateMap(gameState.boardSize);
    }

    const tileMap = gameState.tileMap;
    const boardId = "board";
    const board = document.getElementById(boardId);
    if (!board) throw new Error(`${boardId} id in the document does not exist`);

    board.style.width = `${gameState.boardSize * visualTileDimensions.sizeX}px`;
    board.style.height = `${gameState.boardSize * visualTileDimensions.sizeY}px`;

    tileMap.forEach((col, j) => {
        col.forEach((tile, i) => {
            board.insertAdjacentHTML("beforeend", `
                <div class="tile"
                    style="--x:${tile.visual.offsetX}; --y:${tile.visual.offsetY};
                     --sizeX:${visualTileDimensions.sizeX}; --sizeY:${visualTileDimensions.sizeY}"
                    data-xLogical="${tile.x}" 
                    data-yLogical="${tile.y}" 
                    id="tileX${tile.x}Y${tile.y}">
                </div>
                `);
        });
    });
}