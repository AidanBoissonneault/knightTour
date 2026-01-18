

export function getKnightsTourText(boardSize, extraText = "", extraModifierText = "") {
    
    const outputText = `A standard Knights Tour.
                        Play as a chess knight and land on every square exactly once.
                        A knight moves 2 squares in one direction and 1 squares in an adjacent direction from a knights edge.
                        Uses a ${boardSize}x${boardSize} board. ${extraText} ${extraModifierText}`;

    return outputText;
}

export function getMultiplayerText() {

    const outputText = `Two knights play on a shared knights tour.
                Both knights alternate moves, with white starting first.
                If a knight runs out of moves, or is captured by the opposing knight, they lose the match.
                In online multiplayer, the host is always white.
                Uses a 8x8 board.`;

    return outputText;
}
