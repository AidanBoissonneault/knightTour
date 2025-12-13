import { tileState } from "../tileLogic/tile.js";
import { knightMoveReference } from "../knight/knight.js";

export function checkNextMove(knight, tile, returnState) {
    //add new next moves
    const moveTheKnight = () => {
        knight.move(tile.x, tile.y); 
    }
    if (isInMoves(knight, tile)) {
        tile.visual.documentId.classList.add("next-move");

        tile.visual.documentId.addEventListener("click", moveTheKnight);

        returnState = true;
    }  else {
        tile.visual.documentId.removeEventListener("click", moveTheKnight);
    }

    //communicates if a new move was found
    if (returnState) return true;
    return false;
}

function isInMoves(knight, tile) {
    for (const [dx, dy] of knightMoveReference) {
        if (knight.x + dx === tile.x &&
            knight.y + dy === tile.y &&
            tile.state === tileState.UNVISITED) {

            return true;
        }
    }
    return false;
}