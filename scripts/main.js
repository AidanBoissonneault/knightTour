import { GameController } from "./gameState/gameController.js";
import { createMainMenu } from "./menu-screens/main-menu.js";


//main game controller
export var gameControl = null; //new GameController();

export function resetGameController() {
    gameControl = null;
}

export function makeGameController(controller) {
    if (!(controller instanceof GameController)) throw new Error("controller must be a GameController");
    
    gameControl = controller;
}

createMainMenu();