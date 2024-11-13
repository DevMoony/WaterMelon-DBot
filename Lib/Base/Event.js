const Logger = require("../Core/Logger");

/**
 * @typedef IEvent
 * @property {keyof import("discord.js").ClientEvents} name - The name of the event to run.
 * @property {boolean} once - Whether or not can only be ran once.
 */

/** Creating the class for handling events. */
module.exports = class Event {
    /** 
     * @param {import("../Core/Client")} client 
     * @param {IEvent} data  */
    constructor(client, data) {
        /** @type {import("../Core/Client")} */
        this.client = client;
        /** @type {keyof import("discord.js").ClientEvents} */
        this.name = data.name;
        /** @type {boolean} */
        this.once = data.once;
        /** 
         * @param {string} eventType
         * @type {ReturnType<typeof Logger>} */
        this.logger = (eventType) => Logger(`Event::${eventType}`);
    }

    execute(...args) {
        throw new Error("Not implemented yet...");
    }
}