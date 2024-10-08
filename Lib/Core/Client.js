// Used for interacting with Discord - Client side, so the bot itself.
const { Client, Partials, GatewayIntentBits, Collection } = require("discord.js");

// Used for initiating the event, command and slash command handler.
const EventHandler = require("../Handler/Events");
const MessageCommandHandler = require("../Handler/MessageCommands");

// Resolvers for resolving certain items in a better way.
const UserResolver = require("../Resolvers/User");

// Database - used for several purposes for storing data.
const DB = require("../Database/Database");

<<<<<<< HEAD
// Unused for coding, just for JSDoc
const { DataStore } = require("qulity");

=======
// Utilities - used for various functions.
const { readFromJSON } = require("../Utilities/Utilities");

// IPC - used for IPC. (inter-process communication)
const IPC = require("./IPC");
const Embed = require("../Utilities/Embed/Embed");
const ipc = new IPC(this);

// Sweeper - used for clearing out old data.
>>>>>>> 7acfbb9e9096eef44ca93e376693755bb8b380e8
function Sweeper() {
    return {
        /** @type {import("discord.js").LifetimeSweepOptions} */
        message: { lifetime: 3000, interval: 10300 },
        /** @type {import("discord.js").LifetimeSweepOptions} */
        invite: { lifetime: 1000, interval: 10500 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildBan>} */
        ban: { interval: 8000, filter: (b, _key, _collection) => !b.user.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").MessageReaction>} */
        reaction: { interval: 3000, filter: (r, _key, _collection) => !r.user.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildMember>} */
        guildMember: {
            interval: 3500,
            filter: (m, _key, _collection) => !m.user.bot,
        },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").User>} */
        user: { interval: 5000, filter: (u, _key, _collection) => !u.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").VoiceState>} */
        voiceState: { interval: 1500, filter: (v, _key, _collection) => !v.user.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").Presence}>} */
        presence: { interval: 1000, filter: (p, _key, _collection) => !p.user.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").ThreadMember>} */
        threadMember: { interval: 10000, filter: (t, _key, _collection) => !t.user.bot },
        /** @type {import("discord.js").LifetimeSweepOptions} */
        thread: { lifetime: 1000, interval: 1500 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").StageInstance>} */
        stageInstance: { interval: 1300, filter: (_s, _key, _collection) => !_s.archived },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildEmoji>} */
        emoji: { interval: 1200, filter: (_e, _key, _collection) => !(_e.managed || _e.animated) },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").Sticker>} */
        sticker: { interval: 950, filter: (_s, _key, _collection) => !_s.available },
    };
}

/**
 * @typedef ClientStatistics
 * @property {number} guilds
 * @property {number} channels
 * @property {number} users
 * @property {number} shards
 * @property {number} ram_total
 * @property {number} ram_used
 * @property {number} ram_available */

/**
 * Creating the class for handling the Discord behavior
 * by extending the built-in Client class provided by discord.js */
module.exports = class WaterMelonClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
            ],
            sweepers: {
                messages: Sweeper().message,
                invites: Sweeper().invite,
                bans: Sweeper().ban,
                reactions: Sweeper().reaction,
                guildMembers: Sweeper().guildMember,
                users: Sweeper().user,
                voiceStates: Sweeper().voiceState,
                presences: Sweeper().presence,
                threadMembers: Sweeper().threadMember,
                threads: Sweeper().thread,
                stageInstances: Sweeper().stageInstance,
                emojis: Sweeper().emoji,
                stickers: Sweeper().sticker,
            },
        });

        this.resolvers = {
            user: UserResolver,
        };

        /** @type {typeof DB} */
<<<<<<< HEAD
		this.database = DB;
        
        // Constants for some alternatives
        const msgCmdHandler = new MessageCommandHandler(this);
=======
        this.database = DB;

        const evnts = new EventHandler(this);
>>>>>>> 7acfbb9e9096eef44ca93e376693755bb8b380e8

        // Handlers
        this.interactions = SlashCommandHandler(this);
<<<<<<< HEAD
        /** @type {EventHandler} */
        this.events = new EventHandler(this);
        /** @type {MessageCommandHandler} */
        this.messageCommands = msgCmdHandler;
        /** @type {typeof msgCmdHandler["commands"]} */
        this.commands = msgCmdHandler.commands;
    }

    async start() {
        this.events.load();
        this.messageCommands.load();

        super.login(process.env.TOKEN);
=======

        /**
         * @type {boolean}
         * @default false */
        this.aiEnabled = false;
    }

    getClientStatistics() {
        const available =
            process.memoryUsage().heapTotal - process.memoryUsage().heapUsed;

        return {
            channels: this.channels.cache.size,
            guilds: this.guilds.cache.size,
            ram_available: available,
            ram_used: process.memoryUsage().heapUsed,
            ram_total: process.memoryUsage().heapTotal,
            shards: this.shard?.ids.length ?? 0,
            users: this.users.cache.size,
        };
    }

    async fetchGlobalStatistics() {
        /** @type {ClientStatistics[]} */
        const results = await ipc.send({ op: "ClientStatistics" }, true);
        /** @type {ClientStatistics} */
        const statistics = {
            channels: 0,
            guilds: 0,
            ram_total: 0,
            ram_available: 0,
            ram_used: 0,
            shards: 0,
            users: 0,
        };

        results.map((result) => {
            for (const key of Object.keys(result))
                statistics[key] += result[key];
        });

        return statistics;
    }

    /**
     * @param {import("discord.js").TextBasedChannels} channel
     * @param {string} emoji
     * @param {string} category
     * @param {string} message
     * @returns {Promise<import("discord.js").Message>} */
    async sendNormalMessage(channel, emoji, category, message) {
        return await channel.send(`${emoji} **${category} |** ${message}`);
    }

    /**
     * @param {import("discord.js").TextBasedChannels} channel
     * @param {import("discord.js").APIEmbed} embed
     * @returns {Promise<import("discord.js").Message>} */
    async sendEmbedMessage(channel, embed) {
        this.verifyEmbed(embed, embed.author?.name || "");

        return await channel.send({ embeds: [embed] });
    }

    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     * @param {string} category
     * @param {string} message
     * @returns {Promise<import("discord.js").Message>} */
    async sendInteractionMessage(interaction, category, message) {
        const embed = new Embed().default(
            "Success",
            category,
            message
        );

        return await this.sendInteraction(interaction, { embeds: [embed] });
    }

    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     * @param {import("../types.d.ts").EmbedTypes} theme
     * @param {string} category
     * @param {string} message
     * @returns {Promise<import("discord.js").Message>} */
    async sendThemedInteractionMessage(interaction, theme, category, message) {
        const embed = new Embed(theme).default(
            theme,
            category,
            message
        );
        
        return await this.sendInteraction(interaction, { embeds: [embed] });
    }

    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     * @param {string | import("discord.js").InteractionReplyOptions} options */
    async sendInteraction(interaction, options) {
        if (typeof options !== "string") {
            if (options.embeds?.length) {
                for (const embed of options.embeds) {
                    this.verifyEmbed(embed, embed.author?.name || "");
                }
            }
        }

        if (interaction.replied) await interaction.followUp(options);
        else if (interaction.deferred) await interaction.editReply(options);
        else if (Date.now() - interaction.createdTimestamp < 3000)
            await interaction.reply(options);
    }

    /**
     * @private
     * @param {Embed} embed
     * @param {string} title
     * @returns {Promise<void>} */
    async verifyEmbed(embed, title) {
        let emb = new Embed();
        let ttl = embed.author?.name;
        let desc = embed.description;

        if (!embed.author) embed = emb.default("Success", title, desc);
        if (!embed.color) embed = emb.default("Success", ttl, desc);
    }



    start() {
        ipc.listen();
>>>>>>> 7acfbb9e9096eef44ca93e376693755bb8b380e8
    }
};
