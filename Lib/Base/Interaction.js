/**
 * @typedef IInteraction
 * @property {string} name - The name of the slash command which will be used as the registration of the command.
 * @property {string} description - The description of the slash command.
 * @property {import("discord.js").ApplicationCommandOption[]} options - The options that can be given with the slash command.
 * @property {import("discord.js").ApplicationCommand["defaultMemberPermissions"]} defaultPermission
 */

module.exports = class Interaction {
    /** @param {IInteraction} data  */
    constructor(data) {
        /** @type {string} */
        this.name = data.name;
        /** @type {string} */
        this.description = data.description;
        /** @type {import("discord.js").ApplicationCommandOption[]} */
        this.options = data.options;
    }
}