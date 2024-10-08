const { parse, resolve } = require("path");
<<<<<<< HEAD
const { promisify } = require("util");
const glob = promisify(require("glob"));
=======
const { Glob } = require("glob");
>>>>>>> 7acfbb9e9096eef44ca93e376693755bb8b380e8

const Logger = require("../Core/Logger");
const { isClass } = require("../Utilities/Utilities");
const Event = require("../Base/Event");
const WaterMelonClient = require("../Core/Client");

module.exports = class Events {
    /**
     * @private
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
     * @returns {void} */
    load() {
        const dir = resolve(__dirname, "..", "..", "Events");
		const loader = new Glob(`${dir}/**/*.js`, {
			sync: true,
		});

		loader.stream().on("data", (p) => {
			const path = typeof p === "string"
				? p
				: p.fullpath();
			const splitPath = path.split("/");
			const file = splitPath[splitPath.length - 1];

			delete require.cache[file];

			const { name } = parse(file);
			const File = require(path);
			if (!isClass(File))
				throw new TypeError(
					`Event ${name} doesn't export a class.`,
				);
			
			const event = new File(this.client);
			if (!(event instanceof Event))
				throw new TypeError(
					`Event ${name} doesnt belong in Events.`,
				);
			
			this.client[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
		}).on("error", (err) => {
			this.logger.error(err);
		});

		// return glob(`${dir}/**/*.js`).then((events) => {
		// 	for (const eventFile of events) {
		// 		delete require.cache[eventFile];

		// 		const { name } = parse(eventFile);
		// 		const File = require(eventFile);
		// 		if (!isClass(File))
		// 			throw new TypeError(
		// 				`Event ${name} doesn't export a class.`,
		// 			);

		// 		const event = new File(this.client);
		// 		if (!(event instanceof Event))
		// 			throw new TypeError(
		// 				`Event ${name} doesnt belong in Events.`,
		// 			);
                
        //         this.client[event.once ? "once" : "on"](event.name, event.run.bind(event));
		// 	}
		// });
    }
}