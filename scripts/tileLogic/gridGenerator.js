import { Tile } from "./tile.js";

/* old version
export function generateMap(boardSize) {

    let tempMap = [];
    for (let i = 0; i < boardSize; i++) {
        let tempColumn = [];
        for (let j = 0; j < boardSize; j++) {
            let tempTile = new Tile(i, j);
            tempColumn.push(tempTile);
        }
        tempMap.push(tempColumn);
    }
    return tempMap;
} */

export function generateMap(boardSize) {
    return Array.from({ length: boardSize }, (_, i) =>
        Array.from({ length: boardSize }, (_, j) => new Tile(i, j))
    );
}