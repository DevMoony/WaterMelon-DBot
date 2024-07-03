const MessageCommandContext = require("./MessageCommandContext");

/**
 * Interface used for the command.
 * @typedef IMessageCommand
 * @property {"Developer" | "General"} category - The category this command belongs to. (even though there's a folder for it)
 * @property {string} name - The name of the command. (Used for calling the command, e.g: w!rank [User])
 * @property {string[] | string} aliases - Alias(es) for calling the command.
 * @property {string[] | string} examples - Example(s) for on how to use a certain command.
 * @property {string} usage - How the command should be used. (Note that [] is optional & <> is required e.g: w!rank [User])
 * @property {PermissionResolvable} client_permissions - The permissions required for the bot to do a certain functionality or command.
 * @property {PermissionResolvable} user_permissions - The permissions required for the user to do a certain functionality or command.
 * @property {boolean} mod_only - Whether or not this command can only be ran by a server moderator and above.
 * @property {boolean} admin_only - Whether or not this command can only be ran by a server administrator and above.
 * @property {boolean} owner_only - Whether or not this command can only be ran by the server owner.
 */

/** Creating class for handling the commands being called in chat. */
module.exports = class MessageCommand {
    /** @param {IMessageCommand} data  */
    constructor(data) {
        this.category = data.category;
        this.name = data.name;
        this.aliases = data.aliases;
        this.examples = data.examples;
        this.usage = data.usage;
        this.client_permissions = data.client_permissions;
        this.user_permissions = data.user_permissions;
        this.mod_only = data.mod_only;
        this.admin_only = data.admin_only;
        this.owner_only = data.owner_only;
    }

    /** @param {MessageCommandContext} ctx - The context used for handling the command. */
    execute(ctx) {
        throw new Error("Not implemented yet...");
    }
}