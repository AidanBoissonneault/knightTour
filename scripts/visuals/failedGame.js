import { gameState } from "../gameState/gameState.js";
import { tileState } from "../tileLogic/tile.js";

export function setRemainingTilesFail() {
    gameState.tileMap.forEach(col => {
        col.forEach(tile => {
            if (tile.state === tileState.UNVISITED) {
                tile.visual.documentId.classList.add("failed");
                explodeElement(tile);
            }
        });
    });
}

function explodeElement(tile) {
    // random direction + distance
    const angle = Math.random() * Math.PI * 2;
    const distance = 500 + Math.random() * 300;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    tile.visual.documentId.style.setProperty("--movedX", x);
    tile.visual.documentId.style.setProperty("--movedY", y);
}
