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

    var mode = new StandardMode();
    var modifier = null;

    const createGame = async () => {
        makeGameController(new GameController(mode));
        await loadPageFragment("game.html", "actual-body");
        gameControl.startGame();
    }

    //modes
    const modeStandardRadio = document.getElementById("mode-standard");
    if (!modeStandardRadio) console.log("mode-standard must exist to create an event listener");
    modeStandardRadio.addEventListener("click", () => {
        mode = new StandardMode(modifier);
    });

    const modeIncrementRadio = document.getElementById("mode-increment");
    if(!modeIncrementRadio) console.log("mode-increment must exist to create an evenet listener");
    modeIncrementRadio.addEventListener("click", () => {
        mode = new IncrementMode(modifier);
    });

    const modeLargeRadio = document.getElementById("mode-large");
    if(!modeLargeRadio) console.log("mode-large must exist to create an event listener");
    modeLargeRadio.addEventListener("click", () => {
        mode = new BigBoardMode(modifier);
    });

    const modeGiantRadio = document.getElementById("mode-giant");
    if(!modeGiantRadio) console.log("mode-giant must exist to create an event listener");
    modeGiantRadio.addEventListener("click", () => {
        mode = new GiantBoardMode(modifier);
    });

    
    //modifier

    const modifierNoneRadio = document.getElementById("modifier-none");
    if(!modifierNoneRadio) console.log("modifier-none must exist to create an event listener");
    modifierNoneRadio.addEventListener("click", () => {
        modifier = null;
        mode.modifier = null;
    });

    const modifierRandomRadio = document.getElementById("modifier-random");
    if(!modifierRandomRadio) console.log("modifier-random must exist to create an event listener");
    modifierRandomRadio.addEventListener("click", () => {
        modifier = new RandomStartModifier();
        mode.modifier = new RandomStartModifier();
    });

    //start game
    const startGameButton = document.getElementById("start-game");
    if (!startGameButton) console.log("start-game must exist to create an event listener");
    startGameButton.addEventListener("click", createGame);

    //other

    const localMultiplayerButton = document.getElementById("start-local-multiplayer");
    if (!localMultiplayerButton) throw new Error("start local multiplayer button must exist");
    localMultiplayerButton.addEventListener("click", () => {
        mode = new LocalMultiplayerMode();
        createGame();
    });

    const onlineMultiplayerButton = document.getElementById("start-online-multiplayer");
    if (!onlineMultiplayerButton) throw new Error("start online multiplayer button must exist");
    onlineMultiplayerButton.addEventListener("click", async () => {
        await loadPageFragment("connectScreen.html", "actual-body");
        makeGameController(new GameController(new OnlineMultiplayerMode(), new OnlineHandler()));
        createMultiplayerMenu();
    });

    const rulesButton = document.getElementById("start-rules"); //mobile only
    if (!rulesButton) throw new Error("rules button must exist");
    rulesButton.addEventListener("click", async () => {
        await loadPageFragment("rules.html", "actual-body");
        addBackToMenuEventListener();
    });
}