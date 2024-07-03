const { ChannelType } = require("discord.js");

/**
 * Creating the class for handling the message commands behavior. */
module.exports = class MessageCommandContext {
    /** 
     * @param {import("../Core/Client")} client 
     * @param {import("discord.js").Message} message */
    constructor(client, message) {
        /** 
         * @private
         * @type {import("../Core/Client")} */
        this.clnt = client;
        /** 
         * @private
         * @type {import("discord.js").Message} */
        this.msg = message;
    }

    /** Gets the bot object/class. */
    get client() {
        return this.clnt;
    }

    get bot() {
        return this.client;
    }

    /** Gets the current message that was sent with the command. */
    get message() {
        return this.msg;
    }

    /** Gets the member object of said message command. */
    get member() {
        return this.message.member;
    }

    /** Gets the id of the member of said message command. */
    get memberId() {
        return this.member.id;
    }

    /** Gets the avatar url of the member of said message command. */
    get memberAvatar() {
        return this.member.avatarURL({ size: 2048 });
    }

    /** Gets the display name of the member of said message command. */
    get memberDisplayName() {
        return this.member.displayName;
    }

    /** Gets the author object of said message command. */
    get author() {
        return this.message.author;
    }

    /** Gets the id of the author of said message command. */
    get authorId() {
        return this.author.id;
    }

    /** Gets the avatar url of the author of said message command. */
    get authorAvatar() {
        return this.author.avatarURL({ size: 2048 });
    }

    /** Gets all the roles of the member. */
    get memberRoles() {
        return this.member.roles;
    }

    /** Gets all the text channels by filtering on only getting text channels. */
    get textChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.GuildText);
    }

    /** Gets all the voice channels by filtering on only getting voice channels. */
    get voiceChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.GuildVoice);
    }

    /** Gets all the category channels by filtering on only getting category channels. */
    get categoryChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.GuildCategory);
    }

    /** Gets all the announcement channels by filtering on only getting announcement channels. */
    get announcementChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.GuildAnnouncement);
    }

    /** Gets all the announcement thread channels by filtering on only getting announcement thread channels. */
    get announcementThreadChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.AnnouncementThread);
    }

    /** Gets all the public thread channels by filtering on only getting public thread channels. */
    get publicThreadChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.PublicThread);
    }

    /** Gets all the private thread channels by filtering on only getting private thread channels. */
    get privateThreadChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.PrivateThread);
    }

    /** Gets all the server stage channels by filtering on only getting server stage channels. */
    get stageChannels() {
        return this.guild.channels.cache.filter((x) => x.type === ChannelType.GuildStageVoice);
    }

    /** Gets the global display name of the author of said message command. */
    get globalDisplayName() {
        return this.author.displayName;
    }

    /** Gets all the roles of the guild. */
    get guildRoles() {
        return this.guild.roles;
    }

    /** Gets the guild object of as of where said message command was executed. */
    get guild() {
        return this.message.guild;
    }

    /** Gets the id of the guild as of where said message command was executed. */
    get guildId() {
        return this.guild.id;
    }

    /** Gets the afk channel object of the guild as of where said message command was executed. */
    get afkChannel() {
        return this.guild.afkChannel;
    }

    /** Gets the afk channel id of the guild as of where said message command was executed. */
    get afkChannelId() {
        return this.guild.afkChannel.id;
    }

    /** Gets the rules channel object of the guild as of where said message command was executed. */
    get rulesChannel() {
        return this.guild.rulesChannel;
    }

    /** Gets the rules channel id of the guild as of where said message command was executed. */
    get rulesChannelId() {
        return this.guild.rulesChannel.id;
    }

    /** Gets the icon url of the guild as of where said message command was executed. */
    get guildIcon() {
        return this.guild.iconURL({ size: 2048 });
    }
}