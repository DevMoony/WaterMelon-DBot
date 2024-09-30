const { parse, resolve } = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const { DataStore } = require("qulity");

const Logger = require("../Core/Logger");
const { isClass } = require("../Utilities/Utilities");
const Event = require("../Base/Event");
const WaterMelonClient = require("../Core/Client");

module.exports = class Events {
    /**
	 * @readonly
	 * @type {WaterMelonClient} */
	client;
	/**
	 * @private
	 * @readonly
	 * @type {ReturnType<typeof Logger>} */
	logger;

    /** @param {WaterMelonClient} client */
    constructor(client) {
        this.client = client;
        this.logger = Logger("Events");
    }

    /**
     * A function which loads and registers message events.
	 * @param {FinishyChanDClient} client The client instance.
     * @returns {void} */
    load() {
        const dir = resolve(__dirname, "..", "..", "Events");

		return glob(`${dir}/**/*.js`).then((events) => {
			for (const eventFile of events) {
				delete require.cache[eventFile];

				const { name } = parse(eventFile);
				const File = require(eventFile);
				if (!isClass(File))
					throw new TypeError(
						`Event ${name} doesn't export a class.`,
					);

				const event = new File(this.client);
				if (!(event instanceof Event))
					throw new TypeError(
						`Event ${name} doesnt belong in Events.`,
					);
                
                this.client[event.once ? "once" : "on"](event.name, event.run.bind(event));
			}
		});
    }
}