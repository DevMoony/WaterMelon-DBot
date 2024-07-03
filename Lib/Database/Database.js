// Used for the Database
const { QuickDB } = require("quick.db");
// Used for going to said path
const { join, resolve } = require("path");

/**
 * Used for the leveling interface for the Database interaction.
 * @typedef ILeveling
 * @property {string} userID - The ID of the user, this is unique so the Database can store unique objects.
 * @property {number} messages - The amount of messages sent by the user.
 * @property {number} level - The level of the user.
 * @property {number} prestige - The prestige of the user. This can be done whenever the user reaches a certain amount of messages.
 */
/**
 * Used for the blacklist interface for the Database interaction.
 * @typedef IBlacklist
 * @property {string} userID - The ID of the user, this is unique so the Database can store unique objects.
 * @property {boolean} blacklisted - The state of the user being blacklisted.
 * @property {string} reason - If the user has been blacklisted, this will return as of the reason why the user was blacklisted.
 */

// The path to the Database file
const filePath = resolve(join(process.cwd(), "Lib", "Database", "data.sql"));

module.exports = {
    /** @type {QuickDB<ILeveling>} */
    leveling: new QuickDB({ table: "leveling", filePath }),
    /** @type {QuickDB<IBlacklist>} */
    blacklist: new QuickDB({ table: "blacklist", filePath }),
    settings: new QuickDB({ table: "settings", filePath })
};