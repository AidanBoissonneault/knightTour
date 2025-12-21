import { endGame } from "../gameState/loseGame.js";
import { delay } from "./delay.js";

/**
 * TIMER CLASS
 * base of all timer classes, 
 * counts up from given point.
 * use with a TimerHandler for simplified visual handling.
 */
export class Timer {
    _startTime = 0;
    _elapsed = 0;
    _running = false;

    constructor() {};

    get running() {
        return this._running;
    }

    startTimer() {
        this._startTime = performance.now();
        this._running = true;
    }

    stopTimer() {
        if (!this._running) return;
        this._elapsed += performance.now() - this._startTime;
        this._running = false;
    }


    getTimeMs() {
        return this._running
            ? this._elapsed + (performance.now() - this._startTime)
            : this._elapsed;
    }

    static formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
}

/**
 * COUNTDOWN TIMER
 * Enter a startMs and the timer counts down from that time instead of up.
 */

export class CountdownTimer extends Timer {
    _duration;

    constructor(startMs) {
        super();
        if (startMs <= 0) throw new Error("startMs must be > 0");
        this._duration = startMs;
    }

    get finished() {
        return this.getTimeMs() <= 0;
    }

    /** @override */
    startTimer() {
        if (this._running || this.finished) return;
        this._startTime = performance.now();
        this._running = true;
    }

    /** @override */
    stopTimer() {
        if (!this._running) return;

        this._elapsed += performance.now() - this._startTime;
        this._running = false;

        if (this._elapsed > this._duration)
            this._elapsed = this._duration;
    }

    /** @override */
    getTimeMs() {
        const elapsed = this._running
            ? this._elapsed + (performance.now() - this._startTime)
            : this._elapsed;

        return Math.max(0, this._duration - elapsed);
    }

    /** @override */
    static formatTime(ms) {
        const totalSeconds = Math.ceil(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
}

/**
 * TIMER HANDLER
 * manipulates a Timer object or one of its subclasses
 * mainly used for rapidly updating a docuemntElement
 * with the updated information from a Timer object.
 */

export class TimerHandler {
    #showVisual;
    #timer;
    #documentElement;

    constructor(timer, documentId, autoStartTimer = false) {
        if (!(timer instanceof Timer)) throw new Error("timer must be made from the Timer class");
        this.#timer = timer;
        this.#showVisual = false;
        this.#documentElement = document.getElementById(documentId);

        if (autoStartTimer)
            this.startVisualTimer();
    }

    startVisualTimer() {
        if (this.#showVisual) throw new Error("the timer cannot start if its already started");
        this.#showVisual = true;
        this.#runTimer();
    }

    stopVisualTimer() {
        this.#showVisual = false;
    }

    async #runTimer() {
        if (!this.#timer.running) {
            this.#timer.startTimer();
            await delay(1);
        }

        const timerLogic = () => {
            const timeInMs = this.#timer.getTimeMs();
            const timeString = this.#timer.constructor.formatTime(timeInMs);
            this.#documentElement.innerHTML = timeString;
        }

        while (this.#showVisual && this.#timer.getTimeMs() > 0) {
            timerLogic();
            await delay(16);
        }

        timerLogic();

        //end game logic
        if (this.#timer instanceof CountdownTimer && this.#timer.getTimeMs() === 0)
            endGame();

        if (this.#timer.running)
            this.#timer.stopTimer();

        this.#showVisual = false;
    }

}