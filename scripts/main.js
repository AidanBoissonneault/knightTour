import { GameController } from "./gameState/gameController.js";
import { createMainMenu } from "./menu-screens/main-menu.js";


//main game controller
export var gameControl = null; //new GameController();

export function makeGameController(controller) {
    if (controller instanceof GameController)
        gameControl = controller;
    else throw new Error("controller must be a GameController");
}

createMainMenu();

