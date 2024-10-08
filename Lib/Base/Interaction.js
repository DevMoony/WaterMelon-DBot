const WaterMelonClient = require("../Core/Client");
const InteractionContext = require("./InteractionContext");

/**
 * @typedef CommandOptions
 * @property {{user?: boolean; member?: boolean;}} [ensure] - Whether or not the user or member should be ensured.
 * @property {boolean} [defer] - Whether or not to defer the response.
 * @property {boolean} [owner] - Whether or not this command can only be ran by the developer. */

/** Creating the class for handling interactions. */
module.exports = class Interaction {
    /**
     * @readonly
     * @type {WaterMelonClient} */
    client;
    /**
     * @readonly
     * @type {string} */
    directory;
    /**
     * @abstract
     * @readonly
     * @type {import("discord.js").RESTPostAPIChatInputApplicationCommandsJSONBody} */
    commandData;
    /**
     * @abstract
     * @readonly
     * @type {CommandOptions} */
    commandOptions;
    
    /**
     * @param {WaterMelonClient} client
     * @param {string} directory */
    constructor(client, directory) {
        this.client = client;
        this.directory = directory;
    }

    /**
     * @abstract
     * @param {InteractionContext} context 
     * @returns {Promise<void>} */
    async execute(context) {
        throw new Error("Not implemented yet.");
    }
}