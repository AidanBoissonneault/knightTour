
import { RandomStartModifier } from "./RandomStartModifier.js";

/**
 * @abstract
 */
export class GameMode {

    #boardSize;
    modifier; //stores a modifier like random start mode

    /** @protected */
    buttonHTML;

    /** @abstract */
    constructor(boardSize, modifier = null) {
        if (new.target === GameMode) {
            throw new Error("GameMode is an abstract class");
        }
        this.#boardSize = boardSize;

        this.modifier = modifier;
        if (this.modifier instanceof RandomStartModifier)
            this.modifier.boardSize = boardSize;
    }

    get boardSize() {
        return this.#boardSize;
    }

    set _boardSize(boardSize) {
        this.#boardSize = boardSize;
    }

    get startingX() {
        if (this.modifier instanceof RandomStartModifier)
            return this.modifier.startingX;

        return 0;
    }

    get startingY() {
        if (this.modifier instanceof RandomStartModifier)
            return this.modifier.startingY;

        return 0;
    }

    createRelevantWinButtons(containerId) {
        const element = document.getElementById(containerId);
        if (!element) throw new Error("containerId must link to a document ID");

        element.innerHTML = this.buttonHTML;

        this.createEventListeners();
    }

    /** @abstract */
    createEventListeners() {
        throw new Error("createEvenetListeners() must be overriden");
    }
};