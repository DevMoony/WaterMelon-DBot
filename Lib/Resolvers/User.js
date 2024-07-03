const WaterMelonClient = require("../Core/Client");

module.exports = class UserResolver {
    /** @param {WaterMelonClient} client */
    constructor(client) {
        /** 
         * @private
         * @type {WaterMelonClient} */
        this.client = client;
    }

    /**
     * Resolves a user by defined parameters.
     * @param {string} identifier
     * @returns {Promise<import("discord.js").User | undefined>} */
    async resolve(identifier) {
        let user = this.client.users.cache.find(
            (u) =>
                u.displayName.toLowerCase() === identifier.toLowerCase() ||
                u.username.toLowerCase() === identifier.toLowerCase() ||
                u.id === identifier.replace(/[<>@!]/g, "")
        );

        try {
            if (!user)
                user = this.client.users.fetch(identifier, {
                    cache: false,
                });
        } catch (err) {
            console.error(err);
        }

        return user;
    }
};
