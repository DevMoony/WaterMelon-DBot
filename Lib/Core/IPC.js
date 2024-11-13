const Logger = require("../Core/Logger");
const WaterMelonClient = require("./Client");

/**
 * @typedef IPCContent
 * @property {string} op
 * @property {unknown} [data] */
/**
 * @typedef IPCMessage
 * @property {(data: unknown) => void} reply
 * @property {IPCContent} content
 * @property {boolean} repliable */

module.exports = class IPCClient {
    /**
     * @private
     * @type {WaterMelonClient} */
    client;
    /**
     * @private
     * @type {ReturnType<typeof Logger>} */
    logger;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        this.client = client;
        this.logger = Logger("IPC");
    }

    /**
     * @param {IPCMessage} message
     * @returns {Promise<void>} */
    async onMessage(message) {
        try {
            const content = message.content;

            switch (content.op) {
                case "SlashCommandsUpdate":
                    await this.interactions.updateClientCommands(content.data);
                    break;

                case "ClientStatistics":
                    message.reply(this.client.getStatistics());
                    break;

                case "ActivityUpdate":
                    this.client.user.setActivity(content.data);
                    break;
            }
        } catch (err) {
            this.logger.error(err);
            message.reply(null);
        }
    }

    /**
     * @param {IPCContent} content
     * @param {boolean} repliable
     * @returns {Promise<unknown>} */
    async send(content, repliable = false) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000).unref();

        return await this.client.shard
            ?.send({ content, repliable, signal: controller.signal })
            .finally(() => clearTimeout(timeout));
    }

    /** @returns {void} */
    listen() {
        if (this.client.ready) return;

        this.client.shard?.parentPort?.on("message", (message) =>
            this.onMessage(message)
        );
        this.ready = true;
    }
};
