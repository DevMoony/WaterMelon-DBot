const { EmbedBuilder } = require("discord.js");
const { EmbedThemes } = require("./Themes");

/**
 * @typedef EmbedField
 * @property {string} name - The name of the field
 * @property {string} value - The value of the field
 * @property {boolean} [inline] - Whether or not the field should be inline */
/**
 * @typedef EmbedURL
 * @property {string} url - The url for the embed component */
/**
 * @typedef EmbedFooter
 * @property {string} text - The text for the footer
 * @property {string} [iconURL] - The url for the footer */
/**
 * @typedef EmbedOtherComponents
 * @property {EmbedField[]} [fields] - The fields for the embed
 * @property {EmbedURL} [thumbnail] - The thumbnail for the embed
 * @property {EmbedURL} [image] - The image for the embed
 * @property {EmbedFooter} [footer] - The footer for the embed */

module.exports = class Embed {
    /**
     * Theme Example:
     * >
     * - `Success`- A circle with a check mark
     * - `Pushing`- A box with a arrow pointing upwards
     * - `Cancel`- Circle with an X
     * - `Failed`- Cloud with an X
     * - `Blocked`- A brick wall
     * >
     * - `LowLatency`- A happy face cloud
     * - `NormalLatency`- A regular cloud without a face
     * - `HighLatency`- A sad face cloud
     * >
     * - `LowRisk`- A warning sign with an invisible background
     * - `MediumRisk`- A warning sign with a normal background
     * - `HighRisk`- A warning sign with a normal background and some glowing lines outside of it
     * >
     * - `ToggleOff`- A Discord toggle off button
     * - `ToggleOn`- A Discord toggle on button
     * >
     * - `Settings`- 3 lines with blue lines on it sideways
     * - `Guilds`- 1 squar with a line outside of it deviding itself over to 3 squares
     * - `Bugs`- A bug icon
     *
     * @param {import("../../types.d.ts").EmbedTypes} theme - The theme to use for the embed
     * @param {string} title - The title of the embed
     * @param {string} description - The description of the embed
     * @returns {import("discord.js").APIEmbed} */
    default(theme, title, description) {
        const thm = EmbedThemes[theme];
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(thm.color)
            .setThumbnail(thm.icon);

        return embed.toJSON();
    }

    /**
     * Theme Example:
     * >
     * - `Success`- A circle with a check mark
     * - `Pushing`- A box with a arrow pointing upwards
     * - `Cancel`- Circle with an X
     * - `Failed`- Cloud with an X
     * - `Blocked`- A brick wall
     * >
     * - `LowLatency`- A happy face cloud
     * - `NormalLatency`- A regular cloud without a face
     * - `HighLatency`- A sad face cloud
     * >
     * - `LowRisk`- A warning sign with an invisible background
     * - `MediumRisk`- A warning sign with a normal background
     * - `HighRisk`- A warning sign with a normal background and some glowing lines outside of it
     * >
     * - `ToggleOff`- A Discord toggle off button
     * - `ToggleOn`- A Discord toggle on button
     * >
     * - `Settings`- 3 lines with blue lines on it sideways
     * - `Guilds`- 1 squar with a line outside of it deviding itself over to 3 squares
     * - `Bugs`- A bug icon
     *
     * @param {import("../../types.d.ts").EmbedTypes} theme - The theme to use for the embed
     * @param {string} title - The title of the embed
     * @param {string} description - The description of the embed
     * @param {EmbedOtherComponents} [others] - Other options to pass to the embed
     * @returns {import("discord.js").APIEmbed} */
    custom(theme, title, description) {
        const thm = EmbedThemes[theme];
        const embed = new EmbedBuilder()
            .setColor(thm.color)
            .setAuthor({
                name: title,
                iconURL: thm.icon,
            })
            .setDescription(description);

        if (others) {
            if (others.fields) embed.addFields(others.fields);
            if (others.thumbnail) embed.setThumbnail(others.thumbnail.url);
            if (others.image) embed.setImage(others.image.url);
            if (others.footer) {
                embed.setFooter({ text: others.footer.text });
                if (others.footer.iconURL)
                    embed.setFooter({
                        text: others.footer.text,
                        iconURL: others.footer.iconURL,
                    });
            }
        }

        return embed.toJSON();
    }
};
