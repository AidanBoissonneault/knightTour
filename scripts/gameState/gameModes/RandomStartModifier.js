export class RandomStartModifier {

    #boardSize;

    get startingX() {
        return this.#randomBoardPosition();
    }

    get startingY() {
        return this.#randomBoardPosition();
    }

    set boardSize(boardSize) {
        this.#boardSize = boardSize;
    }

    #randomBoardPosition() {
        return this.#boardSize > 5 ?
                                Math.floor(Math.random() * this.#boardSize) :
                                0;
    }
};