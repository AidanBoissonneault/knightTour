let startTime = 0;
let elapsed = 0;
let running = false;

function startTimer() {
    startTime = performance.now();
    running = true;
}

function stopTimer() {
    if (!running) return;
    elapsed += performance.now() - startTime;
    running = false;
}

function getTimeMs() {
    return running
        ? elapsed + (performance.now() - startTime)
        : elapsed;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}