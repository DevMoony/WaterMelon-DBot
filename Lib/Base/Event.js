/**
 * @typedef IEvent
 * @property {keyof import("discord.js").ClientEvents} name - The name of the event to run.
 * @property {boolean} once - Whether or not can only be ran once.
 */

/** Creating the class for handling events. */
module.exports = class Event {
    /** @param {IEvent} data  */
    constructor(data) {
        /** @type {keyof import("discord.js").ClientEvents} */
        this.name = data.name;
        /** @type {boolean} */
        this.once = data.once;
    }

    execute(...args) {
        throw new Error("Not implemented yet...");
    }
}