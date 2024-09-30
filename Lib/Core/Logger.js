const {
    red,
	yellow,
	green,
	cyan,
	bold,
	gray,
	white,
	redBright,
	blackBright,
} = require("colorette");
const fs = require("fs");
const path = require("path");

/** @enum {number} */
const logLevels = {
	info: { color: cyan, label: "INFO", emoji: "ℹ️" },
	debug: { color: green, label: "DEBUG", emoji: "🐛" },
	warn: { color: yellow, label: "WARN", emoji: "⚠️" },
	error: { color: redBright, label: "ERROR", emoji: "❌" },
	fatal: { color: red, label: "FATAL", emoji: "💀" },
};

/**
 * **!!! NEVER TOUCH NOR USE THIS FUNCTION ELSEWHERE !!!**
 * 
 * @param {import("../../types/main").KeyofType<typeof logLevels>} level - The log level of the console.
 * @param {string} name - The name to give to the log.
 * @param {any[]} message - The message to log to the console. 
 * @returns {string} - The formatted string, used to log to console. */
const formatLog = (level, name, ...message) => {
	const { color, label, emoji } = logLevels[level];
	const timestamp = CurrentFormattedTime(Date.now());

	return [
		`${blackBright("[")}${gray(timestamp)}${blackBright("]")}`,
		`${white("(")}${bold(color(name))}${white(")")}`,
		`${bold(color(`${label} ${emoji}`))}`,
		`${blackBright("➲")}`,
		Array.isArray(message) ? message : message.join(" "),
	].join(" ");
};

/**
 * **!!! NEVER TOUCH NOR USE THIS FUNCTION ELSEWHERE !!!**
 * 
 * @param {string} payload - The data to write to the file.
 * @returns {void} */
const writeFile = (payload) => {
	const logFilePath = path.resolve(path.join(process.cwd(), "Logs"));

	fs.appendFileSync(logFilePath, payload + "\n", "utf8");
};

/**
 * Creates a logger object with methods for logging different levels of messages.
 *
 * @param {string} [name] - The name of the logger. (OPTIONAL)
 * @return An object with methods for logging different levels of messages. */
const Logger = (name) => {
    return {
		/**
		 * Logs an info message.
		 *
		 * @param {any | any[]} message - The info message to be logged.
		 * @return {void} */
		info: (message) => {
			formatLog("info", name, message);
		},
		/**
		 * Logs a debug message.
		 *
		 * @param {any | any[]} message - The debug message to be logged.
		 * @return {void} */
		debug: (message) => {
			formatLog("debug", name, message);
		},
		/**
		 * Logs a warning message.
		 *
		 * @param {any | any[]} message - The warning message to be logged.
		 * @return {void} */
		warn: (message) => {
			formatLog("warn", name, message);
		},
		/**
		 * Logs an error message and writes it to the log file.
		 *
		 * @param {any | any[]} message - The error message to be logged.
		 * @return {void} */
		error: (message) => {
			formatLog("error", name, message);
			writeFile(`[ERROR : ${name}] ${message}`);
		},
		/**
		 * Logs a fatal error message and writes it to the log file.
		 *
		 * @param {any | any[]} message - The error message to be logged.
		 * @return {void} */
		fatal: (message) => {
			formatLog("fatal", name, message);
			writeFile(`[FATAL ERROR : ${name}] ${message}`);
            
            process.exit(10);
		},
	};
};

module.exports = Logger;