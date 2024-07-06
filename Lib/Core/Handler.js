// Used to register application/slash commands.
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

// Both packages below are used for reading to the path of said command to find it.
const { readdirSync } = require("fs");
const { resolve, join } = require("path");

// Used to store the commands.
const { DataStore } = require("qulity");

// Used for logging to console.
const { Logger } = require("./Logger");
const { bgGreen, black, bgCyan } = require("colorette");

// The 3 constants below are the paths to the events, message commands, slash commands.
const MsgCmdsPath = resolve(join(__dirname, "..", "Commands"));
const EventsPath = resolve(join(__dirname, "..", "Events"));
const SlashCmdsPath = resolve(join(__dirname, "..", "SlashCommands"));

/**
 * A function which handles and registers the message commands.
 * @param {import("./Client")} client - The bot/client.
 * @returns {DataStore<string, import("../Base/MessageCommand")>} */
const MessageCommandHandler = (client) => {
    const LOGGER = Logger({
        name: `[HANDLER: ${bgGreen(black("Message Commands"))}]`,
    });

    /** @type {DataStore<string, import("../Base/MessageCommand")>} */
    const map = new DataStore();
    const start = Date.now();
    console.log("\n");

    for (const subFolder of readdirSync(MsgCmdsPath)) {
        LOGGER.info(`- ${subFolder}`);
        const files = readdirSync(resolve(join(MsgCmdsPath, subFolder))).filter(
            (f) => f.endsWith(".js")
        );

        for (const file of files) {
            try {
                let cmd = require(`../Commands/${subFolder}/${file}`);
                cmd = new cmd();

                LOGGER.info(`   ✔ ​​​${file}`);

                map.set(cmd.name, cmd);

                if (cmd.aliases.length) {
                    for (const alias of cmd.aliases) {
                        client.aliases.set(alias, cmd.name);
                    }
                }
            } catch (err) {
                LOGGER.info(`   ❌ ​​​${file}`);
                LOGGER.error(
                    `${file} errorred | Reason: ${err.stack ? err.stack : err}`
                );
            }
        }
    }

    console.log("\n\n");
    LOGGER.info(
        `Loaded ${map.size} commands with ${this.aliases.size} aliases in ${
            start - Date.now()
        }ms`
    );

    return map;
};

/**
 * A function which handles and registers the slash commands.
 * @param {import("./Client")} client - The bot/client. */
const SlashCommandHandler = (client) => {
    const LOGGER = Logger({
        name: `[HANDLER: ${bgCyan(black("Slash Commands"))}]`,
    });

    const map = [];
    const start = Date.now();
    console.log("\n");

    for (const subFolder of readdirSync(SlashCmdsPath)) {
        LOGGER.info(`- ${subFolder}`);
        const files = readdirSync(
            resolve(join(SlashCmdsPath, subFolder))
        ).filter((f) => f.endsWith(".js"));

        for (const file of files) {
            try {
                let slsh = require(`../SlashCommands/${subFolder}/${file}`);
                slsh = new slsh();

                LOGGER.info(`   ✔ ​​​${file}`);

                map.push({
                    name: cmd.name,
                    description: cmd.description,
                    type: cmd.type,
                    options: cmd.options,
                    defaultPermission: cmd.defaultPermission,
                });
            } catch (err) {
                LOGGER.info(`   ❌ ​​​${file}`);
                LOGGER.error(
                    `${file} errorred | Reason: ${err.stack ? err.stack : err}`
                );
            }
        }
    }

    const rest = new REST({ version: "10" }).setToken(client.env("DISCORD_TOKEN"));

    (async () => {
        try {
            LOGGER.info(`Started refreshing application (/) commands.`);

            await rest.put(
                Routes.applicationCommands(client.user.id),
                {
                    body: map
                }
            );

            LOGGER.info(`Successfully reloaded application (/) commands.`);
        } catch (err) {
            LOGGER.error(err.stack ? err.stack : err);
        }
    })();
};

/**
 * A function which handles and registers the events.
 * @param {import("./Client")} client - The bot/client. */
const EventHandler = (client) => {
    const LOGGER = Logger({
        name: `[HANDLER: ${bgCyan(black("Slash Commands"))}]`,
    });

    for (let subFolder of readdirSync(EventsPath)) {
        LOGGER.info(`- ${subFolder}`);
        const files = readdirSync(
            resolve(join(SlashCmdsPath, subFolder))
        ).filter((f) => f.endsWith(".js"));

        for (const file of files) {
            try {
                let event = require(`../Events/${subFolder}/${file}`);
                event = new event();
                const name = event.name || file.split(".")[0];

                LOGGER.info(`   ✔ ​​​${file}`);

                client[event.once ? "once" : "on"](name, event.run.bind(null, this));
            } catch (err) {
                LOGGER.info(`   ❌ ​​​${file}`);
                LOGGER.error(
                    `${file} errorred | Reason: ${err.stack ? err.stack : err}`
                );
            }
        }
    }
};

module.exports = {
    MessageCommandHandler,
    SlashCommandHandler,
    EventHandler
};
