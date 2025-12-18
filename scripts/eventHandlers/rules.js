import { addExpandBoxEventListeners } from "../utilities/expandBox.js";

/**
 * Uses the expandBox library ( by me )
 * this function adds the text required
 * for the rules in into an expandBox to documentId "expand-box"
 */

export function addRulesBox() {
    const documentId = "expand-box";
    const closedText = "RULES";
    const openText =  `
                <h1 class="text-3d">RULES</h1>
                <p id="rules-text">
                    The knight must land on each square exactly once.
                    <br>If the knight rules out of possible moves... 
                    <br>YOU LOSE! thats it!
                    <br>Enjoy!
                </p>`;
    addExpandBoxEventListeners(documentId, closedText, openText);
}