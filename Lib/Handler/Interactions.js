const { REST } = require("@discordjs/rest");
const { Routes, Collection } = require("discord.js");
const { parse, resolve } = require("path");
const { Glob } = require("glob");

const Capitalise = require("../Utilities/Capitalise");
const Logger = require("../Core/Logger");
const { isClass } = require("../Utilities/Utilities");
const Interaction = require("../Base/Interaction");
const InteractionContext = require("../Base/InteractionContext");
const Embed = require("../Utilities/Embed/Embed");
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
    /**
     * @readonly
     * @type {import("discord.js").Collection<string, Interaction>} */
    commands;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        this.client = client;
        this.logger = Logger("Interactions");
        this.commands = new Collection();
    }

    /**
     * A function which loads and registers interactions.
     * @returns {void} */
    load() {
        const dir = resolve(__dirname, "..", "..", "Interactions");
        const loader = new Glob(`${dir}/**/*.js`, {
            sync: true,
        });

        this.logger.debug("Loading interactions...");

        loader.stream().on("data", (p) => {
            const path = typeof p === "string" ? p : p.fullpath();
            const splitPath = path.split("/");
            const file = splitPath[splitPath.length - 1];

            delete require.cache[file];

            const { name } = parse(file);
            const File = require(path);
            if (!isClass(File))
                throw new TypeError(
                    `Interaction ${name} doesn't export a class.`
                );

            const interaction = new File(this.client);
            if (!(interaction instanceof Interaction))
                throw new TypeError(
                    `Interaction ${name} doesnt belong in Interactions.`
                );
            
            this.commands.set(interaction.commandData.name, interaction);
        });

        this.logger.debug(`Loading process finished! Loaded ${this.commands.size} interactions.`);
    }

    /**
     * Updates the (/) commands for the client/guild, used for registering or updating (/) commands including parsing some options.
     *
     * @param {import("../types.d.ts").UpdateCommandOptions} options - The options to parse with updating the commands for the client.
     * @returns {Promise<void>} */
    async updateClientCommands(options) {
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
        /** @type {import("discord.js").RESTPostAPIChatInputApplicationCommandsJSONBody[]} */
        const body = [];

        if (!options.clear) {
            for (const command of this.commands.values())
                body.push(command.commandData);
        }

        if (options.guildId) {
            await rest.put(
                Routes.applicationGuildCommands(
                    this.client.user.id,
                    options.guildId
                ),
                { body }
            );
            this.logger.debug(
                `Updated slash command(s) successfully at ${options.guildId} | Clear?: ${options.clear}`
            );

            return;
        }

        await rest.put(Routes.applicationCommands(this.client.user.id), {
            body,
        });
        this.logger.debug(
            `Updated slash command(s) successfully globally | Clear?: ${options.clear}`
        );
    }

    /**
     * Processes a chat input interaction.
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @returns {Promise<void>} */
    async processChatInputInteraction(interaction) {
        const context = new InteractionContext(this.client, interaction);

        try {
            const command = this.commands.get(context.interaction.commandName);
            if (!command) return;

            await context.interaction.guild.members.fetchMe();
            const options = command.commandOptions;

            if (
                options.owner &&
                !["671374842951630858"].includes(interaction.user.id)
            )
                return await context.sendInteractionMessage(
                    Capitalise("an error has occurred"),
                    "This command is only accessible for my owners."
                );
            if (options.defer) await context.interaction.deferReply();
            if (options.ensure) {
                if (options.ensure.user)
                    await this.client.users.fetch(context.user.id);
                if (options.ensure.member)
                    await context.interaction.guild.members.fetch(
                        context.user.id
                    );
            }

            await command.execute(context);
        } catch (err) {
            this.logger.error(
                `An error has occurred while processing an interaction: ${err}`
            );
            if (err instanceof Error) {
                const embed = new Embed().default(
                    "Failed",
                    "An Error Has Occurred",
                    err.message
                );
                
                await context.sendInteraction({ embeds: [embed] });
            }
        }
    }
};
