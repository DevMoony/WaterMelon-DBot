const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const Interaction = require("../../Lib/Base/Interaction");
const WaterMelonClient = require("../../Lib/Core/Client");
const InteractionContext = require("../../Lib/Base/InteractionContext");
const Capitalise = require("../../Lib/Utilities/Capitalise/index");
const Embed = require("../../Lib/Utilities/Embed/Embed");

const CommandData = new SlashCommandBuilder()
    .setName("add-emoji")
    .setDescription("Add a new emoji to the server")
    .addAttachmentOption((option) =>
        option //
            .setName("emoji")
            .setDescription("The emoji to add")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option //
            .setName("name")
            .setDescription("The name of the emoji")
            .setRequired(true)
    );

module.exports = class AddEmojiSlashCommand extends Interaction {
    /** @type {import("discord.js").RESTPostAPIChatInputApplicationCommandsJSONBody} */
    commandData;
    /** @type {import("../../Lib/Base/Interaction").CommandOptions} */
    commandOptions;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        super(client, "Moderation");

        this.commandData = CommandData.toJSON();
        this.commandOptions = {};
    }

    /** @param {InteractionContext} ctx */
    async execute(ctx) {
        if (
            !ctx.interaction.memberPermissions.has(
                PermissionsBitField.Flags.CreateGuildExpressions
            )
        )
            return ctx.sendThemedInteraction(
                "Cancel",
                "An Error Occurred",
                "You don't have permission to add an emoji to this server."
            );
        
        const upload = ctx.interaction.options.getAttachment("emoji");
        const name = ctx.interaction.options.getString("name");

        await ctx.sendThemedInteraction(
            "Success",
            "Expressions",
            `Loading your emoji...`
        );

        // check mail for discord bot
    }
};
