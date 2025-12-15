//import { gameState } from "./gameState/gameState.js"
import { renderBoard } from "./visuals/tileRenderer.js";
import { addRulesBox } from "./eventHandlers/rules.js";
import { addUndoEventListener } from "./eventHandlers/undoButton.js";

addRulesBox();
renderBoard();
addUndoEventListener();