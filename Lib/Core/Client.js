// Used for interacting with Discord - Client side, so the bot itself.
const { Client, Partials, GatewayIntentBits } = require("discord.js");

// Used for initiating the event, command and slash command handler.
const EventHandler = require("../Handler/Events");

// Resolvers for resolving certain items in a better way.
const UserResolver = require("../Resolvers/User");

// Database - used for several purposes for storing data.
const DB = require("../Database/Database");

// Utilities - used for various functions.
const {
    readFromJSON
} = require("../Utilities/Utilities");

function Sweeper() {
    return {
        /** @type {import("discord.js").LifetimeSweepOptions} */
        message: { lifetime: 3000, interval: 10300 },
        /** @type {import("discord.js").LifetimeSweepOptions} */
        invite: { lifetime: 1000, interval: 10500 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildBan>} */
        ban: { interval: 8000, filter: (b, _key, _collection) => !b.user.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").MessageReaction>} */
        reaction: { interval: 3000 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildMember>} */
        guildMember: {
            interval: 3500,
            filter: (m, _key, _collection) => !m.user.bot,
        },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").User>} */
        user: { interval: 5000, filter: (u, _key, _collection) => !u.bot },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").VoiceState>} */
        voiceState: { interval: 1500 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").Presence}>} */
        presence: { interval: 1000 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").ThreadMember>} */
        threadMember: { interval: 10000 },
        /** @type {import("discord.js").LifetimeSweepOptions} */
        thread: { lifetime: 1000, interval: 1500 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").StageInstance>} */
        stageInstance: { interval: 1300 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").GuildEmoji>} */
        emoji: { interval: 1200 },
        /** @type {import("discord.js").SweepOptions<string, import("discord.js").Sticker>} */
        sticker: { interval: 950 },
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
        
        const evnts = new EventHandler(this);

        this.commands = MessageCommandHandler(this);
        this.interactions = SlashCommandHandler(this);
        
        /** 
         * @type {boolean}
         * @default false */
        this.aiEnabled = false;
    }

    start() {
        
    }
};
