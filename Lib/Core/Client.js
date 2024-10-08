// Used for interacting with Discord - Client side, so the bot itself.
const { Client, Partials, GatewayIntentBits, Collection } = require("discord.js");

// Used for initiating the event, command and slash command handler.
const EventHandler = require("../Handler/Events");
const MessageCommandHandler = require("../Handler/MessageCommands");

// Resolvers for resolving certain items in a better way.
const UserResolver = require("../Resolvers/User");

// Database - used for several purposes for storing data.
const DB = require("../Database/Database");

// Unused for coding, just for JSDoc
const { DataStore } = require("qulity");

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
		this.database = DB;
        
        // Constants for some alternatives
        const msgCmdHandler = new MessageCommandHandler(this);

        // Handlers
        this.interactions = SlashCommandHandler(this);
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
    }
};
