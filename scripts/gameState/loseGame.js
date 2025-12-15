import { addFailScreenEventListeners } from "../eventHandlers/failScreen.js";
import { loadPageFragment } from "../utilities/loadPageFragment.js";
import { setRemainingTilesFail } from "../visuals/failedGame.js";

export async function endGame() {
    setRemainingTilesFail();
    await loadPageFragment("overlay-screens/fail.html", "overlay-screen-container");
    addFailScreenEventListeners();
}