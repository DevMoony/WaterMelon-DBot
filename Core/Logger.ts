import {
    red,
    yellow,
    green,
    cyan,
    bold,
    gray,
    white,
    redBright,
    blackBright,
} from "npm:colorette";
import { appendFileSync, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { KeyOfType } from "../types.d.ts";
import { CurrentFormattedTime, Dayify } from "../Core/Utilities.ts";
import process from "node:process";
import moment from "moment";

const logLevels = {
    info: { color: cyan, label: "INFO", emoji: "ℹ️" },
	debug: { color: green, label: "DEBUG", emoji: "🐛" },
	warn: { color: yellow, label: "WARN", emoji: "⚠️" },
	error: { color: redBright, label: "ERROR", emoji: "❌" },
	fatal: { color: red, label: "FATAL", emoji: "💀" },
};

// For reasons such as reusing, this'll be outside any function
// so 1 constant can be used in every function, instead of 
// creating it over and over again in each function.
const now = new Date();

/**
 * **!!! NEVER TOUCH NOR USE THIS FUNCTION ELSEWHERE !!!**
 * 
 * @param level - The log level to give to the log.
 * @param name - The name/category to give to the logger. 
 * @param message - The message to log using the logger formation. */
const formatLog = (level: KeyOfType<typeof logLevels>, name: string, message: string): string => {
    const { color, label, emoji } = logLevels[level];
    const timestamp = CurrentFormattedTime(now);

    return [
        `${blackBright("[")}${gray(timestamp)}${blackBright("]")}`,
		`${white("(")}${bold(color(name))}${white(")")}`,
		`${bold(color(`${label} ${emoji}`))}`,
		`${blackBright("➲")}`,
        Array.isArray(message) ? message.join(" ") : message
    ].join(" ");
};

/**
 * **!!! NEVER TOUCH NOR USE THIS ELSEWHERE !!!**
 * 
 * @param payload - The data to write to the file. */
const writeFile = async (payload: string) => {
    // Switch getMonth() to alphabethical month
    const name = `${Dayify(Date.now())}-${now.getMonth()}_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}.log`;
    const folderName = join(process.cwd(), "logs", now.getFullYear().toString());
    const exists = existsSync(folderName);

    if (!exists) await mkdir(folderName);

    appendFileSync(resolve(join(folderName, name)), `${payload}\n`, "utf-8");
};

// https://github.com/DevMoony/WaterMelon-DBot/blob/7acfbb9e9096eef44ca93e376693755bb8b380e8/Lib/Core/Logger.js#L55