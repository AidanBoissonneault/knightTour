import { GameController } from "./gameState/gameController.js";
import { loadPageFragment } from "./utilities/loadPageFragment.js";

import { BigBoardMode, StandardMode } from "./gameState/gameModes/standardMode.js";
import { IncrementMode } from "./gameState/gameModes/incrementMode.js";

import { RandomStartModifier } from "./gameState/gameModes/RandomStartModifier.js";

//main game controller
export var gameControl = null; //new GameController();

async function startTitleScreen() {
    await loadPageFragment("title-screen.html", "actual-body");

    const regularButton = document.getElementById("start-regular");
    const randomButton = document.getElementById("start-random");
    const incrementButton = document.getElementById("start-increment");
    const settingsButton = document.getElementById("start-settings");
    const bigBoardButton = document.getElementById("start-bigboard");

    const createGame = async () => {
        await loadPageFragment("game.html", "actual-body");
        gameControl.startGame();
    }

    if (!regularButton) throw new Error("start standard game button must exist");
    regularButton.addEventListener("click", async () => {
        gameControl = new GameController(new StandardMode());
        createGame();
    });

    if (!randomButton) throw new Error("start random game button must exist");
    randomButton.addEventListener("click", () => {
        gameControl = new GameController(new StandardMode(new RandomStartModifier));
        createGame();
    });

    if (!incrementButton) throw new Error("start increment game button must exist");
    incrementButton.addEventListener("click", () => {
        gameControl = new GameController(new IncrementMode());
        createGame();
    });

    if (!bigBoardButton) throw new Error("start big board game button must exist");
    bigBoardButton.addEventListener("click", () => {
        gameControl = new GameController(new BigBoardMode());
        createGame();
    });
}

startTitleScreen();

