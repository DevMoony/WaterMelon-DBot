const { parse, resolve } = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const { Collection } = require("discord.js");

const Logger = require("../Core/Logger");
const { isClass } = require("../Utilities/Utilities");
const Command = require("../Base/MessageCommand");
const WaterMelonClient = require("../Core/Client");

module.exports = class MessageCommands {
    /**
     * @readonly
     * @type {WaterMelonClient} */
    client;
    /**
     * @private
     * @readonly
     * @type {ReturnType<typeof Logger>} */
    logger;
    /**
     * @private
     * @type {Collection<string, Command>} */
    cmds;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        this.client = client;
        this.logger = Logger("Message Commands");
        this.cmds = new Collection();
    }

    /** @returns {Collection<string, Command>} */
    get commands() {
        return this.cmds;
    }

    /**
     * A function which loads and registers message events.
     * @param {WaterMelonClient} client The client instance.
     * @returns {void} */
    async load() {
        const dir = resolve(__dirname, "..", "..", "Commands");

        return glob(`${dir}/**/*.js`).then((commands) => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];

                const { name } = parse(commandFile);
                const File = require(commandFile);
                if (!isClass(File))
                    throw new TypeError(
                        `Command ${name} doesn't export a class.`,
                    );
                
                const command = new File(this.client);
                if (!(command instanceof Command))
                    throw new TypeError(
                        `Command ${name} doesnt belong in Commands.`,
                    );
                
                this.cmds.set(command.name, command);
                this.logger.info(`Loaded command ${name}.`);
            }

            this.logger.info(`Loaded ${this.cmds.size} commands.`);
        });
    }
}