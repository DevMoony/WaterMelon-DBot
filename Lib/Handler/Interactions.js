const { REST } = require("@discordjs/rest");
const { Routes, ChatInputCommandInteraction } = require("discord.js");
const { parse, resolve } = require("path");
const { Glob } = require("glob");

const Logger = require("../Core/Logger");
const { isClass } = require("../Utilities/Utilities");
const Interaction = require("../Base/Interaction");
const WaterMelonClient = require("../Core/Client");

module.exports = class Interactions {
    /**
     * @private
     * @readonly
     * @type {WaterMelonClient} */
    client;
    /**
     * @private
     * @readonly
     * @type {ReturnType<typeof Logger>} */
    logger;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        this.client = client;
        this.logger = Logger("Interactions");
    }

    /**
     * A function which loads and registers interactions.
     * @returns {void} */
    load() {
        const dir = resolve(__dirname, "..", "..", "Interactions");
        const loader = new Glob(`${dir}/**/*.js`, {
            sync: true,
        });

        loader.stream().on("data", (p) => {
            const path = typeof p === "string"
                ? p
                : p.fullpath();
            const splitPath = path.split("/");
            const file = splitPath[splitPath.length - 1];

            delete require.cache[file];

            const { name } = parse(file);
            const File = require(path);
            if (!isClass(File))
                throw new TypeError(
                    `Interaction ${name} doesn't export a class.`,
                );

            const interaction = new File(this.client);
            if (!(interaction instanceof Interaction))
                throw new TypeError(
                    `Interaction ${name} doesnt belong in Interactions.`,
                );
            
            
        });
    }
}