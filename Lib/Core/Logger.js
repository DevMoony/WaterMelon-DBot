const { bold, cyan, gray, italic, red, yellow } = require("colorette");

/** @enum {number} */
const LogLevels = {
    DEBUG: 2,
    INFO: 1,
    WARN: 3,
    ERROR: 5,
    FATAL: 10,
};

/** @type {Map<LogLevels, string>} */
const prefixes = new Map([
    [LogLevels.DEBUG, "DEBUG"],
    [LogLevels.INFO, "INFO"],
    [LogLevels.WARN, "WARN"],
    [LogLevels.ERROR, "ERROR"],
    [LogLevels.FATAL, "FATAL"],
]);

/** @param {string} msg - The message to return. */
const noColor = (msg) => msg;
/** @type {Map<LogLevels, (str: string) => string>} */
const colorFunctions = new Map([
    [LogLevels.DEBUG, gray],
    [LogLevels.INFO, cyan],
    [LogLevels.WARN, yellow],
    [LogLevels.ERROR, (str) => red(str)],
    [LogLevels.FATAL, (str) => red(bold(italic(str)))],
]);

/**
 * @param {Object} [param0={}]
 * @param {LogLevels} [param0.LogLevel=LogLevels.INFO]
 * @param {string} param0.name  */
function Logger({ LogLevel = LogLevels.INFO, name } = {}) {
    /**
     * @param {LogLevels} level - The level to use for logging to the console.
     * @param {...any} args - The arguments to provide with the log, aka, the message. */
    function LOG(level, ...args) {
        if (level < LogLevel) return;

        let color = colorFunctions.get(level);
        if (!color) color = noColor;

        const date = new Date();
        const log = [
            `[${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}]`,
            color(prefixes.get(level) || "DEBUG"),
            name ? `${name} >` : ">",
            ...args,
        ];

        switch (level) {
            case LogLevels.DEBUG:
                return console.log(...log);
            case LogLevels.INFO:
                return console.info(...log);
            case LogLevels.WARN:
                return console.warn(...log);
            case LogLevels.ERROR:
                return console.error(...log);
            case LogLevels.FATAL:
                return console.error(...log);

            default:
                return console.log(...log);
        }
    }

    /** @param {typeof LogLevels} level - The level to use for logging to console. */
    function setLevel(level) {
        LogLevel = level;
    }

    /** @param {...any} args - The arguments to provide with the log, aka, the message. */
    function debug(...args) {
        LOG(LogLevels.DEBUG, ...args);
    }

    /** @param {...any} args - The arguments to provide with the log, aka, the message. */
    function info(...args) {
        LOG(LogLevels.INFO, ...args);
    }

    /** @param {...any} args - The arguments to provide with the log, aka, the message. */
    function warn(...args) {
        LOG(LogLevels.WARN, ...args);
    }

    /** @param {...any} args - The arguments to provide with the log, aka, the message. */
    function error(...args) {
        LOG(LogLevels.ERROR, ...args);
    }

    /** @param {...any} args - The arguments to provide with the log, aka, the message. */
    function fatal(...args) {
        LOG(LogLevels.FATAL, ...args);
    }

    return {
        LOG,
        setLevel,
        debug,
        info,
        warn,
        error,
        fatal,
    };
}

const LOGGER = Logger();

module.exports = {
    LogLevels,
    Logger,
    LOGGER
};
