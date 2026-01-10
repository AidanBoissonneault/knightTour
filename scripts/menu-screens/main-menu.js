import { GameController } from "../gameState/gameController.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { BigBoardMode, GiantBoardMode, StandardMode } from "../gameState/gameModes/standardMode.js";
import { IncrementMode } from "../gameState/gameModes/incrementMode.js";
import { LocalMultiplayerMode } from "../gameState/gameModes/localMultiplayerMode.js";
import { RandomStartModifier } from "../gameState/gameModes/RandomStartModifier.js";
import { gameControl, makeGameController } from "../main.js";
import { OnlineHandler } from "../multiplayer/OnlineHandler.js";
import { OnlineMultiplayerMode } from "../gameState/gameModes/onlineMultiplayerMode.js";
import { createMultiplayerMenu } from "./multiplayer-menu.js";
import { addBackToMenuEventListener } from "../eventHandlers/backToMenuButton.js";


export async function createMainMenu() {
await loadPageFragment("title-screen.html", "actual-body");

    const regularButton = document.getElementById("start-regular");
    const randomButton = document.getElementById("start-random");
    const incrementButton = document.getElementById("start-increment");
    const settingsButton = document.getElementById("start-settings");
    const bigBoardButton = document.getElementById("start-bigboard");
    const giantBoardButton = document.getElementById("start-giantboard");
    const localMultiplayerButton = document.getElementById("start-local-multiplayer");
    const onlineMultiplayerButton = document.getElementById("start-online-multiplayer");
    const rulesButton = document.getElementById("start-rules");

    const createGame = async () => {
        await loadPageFragment("game.html", "actual-body");
        gameControl.startGame();
    }

    if (!regularButton) throw new Error("start standard game button must exist");
    regularButton.addEventListener("click", async () => {
        makeGameController(new GameController(new StandardMode()));
        createGame();
    });

    if (!randomButton) throw new Error("start random game button must exist");
    randomButton.addEventListener("click", () => {
        makeGameController(new GameController(new StandardMode(new RandomStartModifier)));
        createGame();
    });

    if (!incrementButton) throw new Error("start increment game button must exist");
    incrementButton.addEventListener("click", () => {
        makeGameController(new GameController(new IncrementMode()));
        createGame();
    });
 
    /* removed from main menu
    if (!bigBoardButton) throw new Error("start big board game button must exist");
    bigBoardButton.addEventListener("click", () => {
        makeGameController(new GameController(new BigBoardMode()));
        createGame();
    });

    if (!giantBoardButton) throw new Error("start giant board game button must exist");
    giantBoardButton.addEventListener("click", () => {
        makeGameController(new GameController(new GiantBoardMode(new RandomStartModifier)));
        createGame();
    });*/

    if (!localMultiplayerButton) throw new Error("start local multiplayer button must exist");
    localMultiplayerButton.addEventListener("click", () => {
        makeGameController(new GameController(new LocalMultiplayerMode()));
        createGame();
    });

    if (!onlineMultiplayerButton) throw new Error("start online multiplayer button must exist");
    onlineMultiplayerButton.addEventListener("click", async () => {
        await loadPageFragment("connectScreen.html", "actual-body");
        makeGameController(new GameController(new OnlineMultiplayerMode(), new OnlineHandler()));
        createMultiplayerMenu();
    });

    if (!rulesButton) throw new Error("rules button must exist");
    rulesButton.addEventListener("click", async () => {
        await loadPageFragment("rules.html", "actual-body");
        addBackToMenuEventListener();
    });
}