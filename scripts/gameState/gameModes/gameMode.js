
import { RandomStartModifier } from "./RandomStartModifier.js";

/**
 * @abstract
 * Used to modify the gameController and gameState based off the mode selected
 */
export class GameMode {

    #boardSize;
    
    #multiplayer; //if the game is a multiplayer game (true / false)
    #online; //if the game is online (true / false)

    /** @type RandomStartModifier | null*/ 
    #modifier; //stores a modifier like random start mode

    /** @protected @type string */
    buttonHTML;

    /** @abstract */
    constructor(boardSize, modifier = null, multiplayer = false, online = false) {
        if (new.target === GameMode) {
            throw new Error("GameMode is an abstract class");
        }
        this.#boardSize = boardSize;

        this.#multiplayer = multiplayer;
        this.#online = online;

        this.#modifier = modifier;
        if (this.#modifier instanceof RandomStartModifier)
            this.#modifier.boardSize = boardSize;
    }

    get modifier() {
        return this.#modifier;
    }

    set modifier(modifier) {
        this.#modifier = modifier;
        if (this.#modifier instanceof RandomStartModifier)
            this.#modifier.boardSize = this.#boardSize;
    }

    get boardSize() {
        return this.#boardSize;
    }

    set _boardSize(boardSize) {
        this.#boardSize = boardSize;
    }

    get startingX() {
        if (this.#modifier instanceof RandomStartModifier)
            return this.#modifier.startingX;

        return 0;
    }

    get startingY() {
        if (this.#modifier instanceof RandomStartModifier)
            return this.#modifier.startingY;

        return 0;
    }

    get multiplayer() {
        return this.#multiplayer;
    }

    get online() {
        return this.#online;
    }

    /**
     * uses the GameMode buttonHTML var (string) to input text into an element
     * @param {string} containerId This is the id of the element buttonHTML is inserted.
     */
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