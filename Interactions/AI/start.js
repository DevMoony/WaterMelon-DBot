const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Interaction = require("../../Lib/Base/Interaction");
const WaterMelonClient = require("../../Lib/Core/Client");
const InteractionContext = require("../../Lib/Base/InteractionContext");
const Capitalise = require("../../Lib/Utilities/Capitalise/index");
const Embed = require("../../Lib/Utilities/Embed/Embed");

const CommandData = new SlashCommandBuilder()
    .setName(Capitalise("start"))
    .setDescription(Capitalise("Starts the AI bot"));

module.exports = class StartAISlashCommand extends Interaction {
    /** @type {import("discord.js").RESTPostAPIChatInputApplicationCommandsJSONBody} */
    commandData;
    /** @type {import("../../Lib/Base/Interaction").CommandOptions} */
    commandOptions;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        super(client, "AI");

        this.commandData = CommandData.toJSON();
        this.commandOptions = {};
    }

    /** @param {InteractionContext} ctx */
    async execute(ctx) {
        const aiEnabled = this.client.aiEnabled;
        /** @type {import("../../Lib/Database/Database").IAI} */
        const AI = await this.client.database.ai.get(ctx.guildId);

        if (aiEnabled) {
            ctx.sendThemedInteraction(
                "Cancel",
                "An Error Occurred",
                "An AI instance is already running."
            );
        } else if (
            !aiEnabled &&
            [ChannelType.PublicThread, ChannelType.PrivateThread].includes(
                ctx.interaction.channel.type
            )
        ) {
            const embed = new Embed().default(
                "Success",
                "AI | Instance",
                "Initiated a new instance successfully, you may now talk in here to talk to the AI."
            );
            /** @type {import("discord.js").GuildTextThreadManager<ChannelType.AnnouncementThread> | import("discord.js").GuildTextThreadManager<import("discord.js").AllowedThreadTypeForTextChannel>} */
            const channel = ctx.interaction.channel.threads;
            channel.create({
                name: `AI_${ctx.authorId}`,
                type: ChannelType.PublicThread,
                startMessage: {
                    embeds: [embed],
                },
            }).then((x) => x.setAppliedTags(["AI"], "[WaterMerlon] Creating AI Instance"));

            await this.client.database.ai.set(ctx.guildId, {
                guildID: ctx.guildId,
            });
            this.client.aiEnabled = true;

            ctx.sendThemedInteraction(
                "Success",
                "AI",
                "The AI has been started."
            );
        } // else {

        //
        // }
    }
};
