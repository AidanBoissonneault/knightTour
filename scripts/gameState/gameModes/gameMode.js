
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

    /** @abstract */
    get startingBoardSize() {
        throw new Error("get startingBoardSize() must be overriden");
    }

    /** @protected */
    get _boardSize() {
        return this.#boardSize;
    }

    /** @override */
    get startingX() {
        if (this.modifier instanceof RandomStartModifier)
            return this.modifier.startingX;

        return 0;
    }

    /** @override */
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

    /** @override */
    createEventListeners() {
        throw new Error("createEvenetListeners() must be overriden");
    }
};

/*
<div class="button-container"><button id="increment-button" class="menu-button" style="--content:'INCREMENT';"></button></div>
<div class="button-container"><button id="try-again-button" class="menu-button" style="--content:'REPLAY';"></button></div>
*/