import { MultiplayerKnight } from "./multiplayerKnight.js";
import { gameControl } from "../main.js";
import { gameState } from "../gameState/gameState.js";

/**
 * Used for sending online packets on top of normal play
 */
export class OnlineKnight extends MultiplayerKnight {
    
    /**@override */
    move(x, y, fromNetwork = false) {

        if (!fromNetwork) {
            const isMyTurn =
                (gameControl.onlineHandler.isHost &&
                    gameState.currentTurn === gameState.knight) ||
                (!gameControl.onlineHandler.isHost &&
                    gameState.currentTurn === gameState.knight2);

            if (!isMyTurn) return;
        }

        super.move(x, y);

        if (!fromNetwork)
            gameControl.onlineHandler.send({
                type: "move",
                payload: {
                    posX: x,
                    posY: y
                }
            })
    }
}