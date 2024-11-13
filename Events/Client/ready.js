const Event = require("../../Lib/Base/Event");

module.exports = class ReadyEvent extends Event {
    /** @param {WaterMelonClient} client */
    constructor(client) {
        super(client, {
            name: "ready",
            once: true
        });
    }

    execute() {
        const guilds = this.client.guilds.cache.size;
        const users = this.client.users.cache.size;
        const channels = this.client.channels.cache.size;

        this.logger.info(`Cluster Loaded! [${this.client.user.displayName}] in this cluster contains ${guilds} guild(s) | ${users} user(s) | ${channels} channel(s)`);
        this.client.interactions.updateClientCommands({
            clear: false
        });

        return Promise.resolve(undefined);
    }
}