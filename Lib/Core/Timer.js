const moment = require("moment");
const parsems = (async () => (await import("parse-ms")).default)();

/**
 * Creates a promise that resolves after a specified amount of time.
 *
 * @param {number} ms - The time in milliseconds to wait before resolving the promise.
 * @return {Promise<void>} A promise that resolves after the specified time. */
const Sleep = (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Parses a given time in milliseconds into a human-readable string.
 *
 * @param {number} ms - The time in milliseconds to be parsed.
 * @param {object} data - An options object.
 * @param {boolean} [data.fromNow=false] - Whether to calculate the time from now.
 * @param {boolean} [data.includeSeconds=false] - Whether to include seconds in the result.
 * @param {string} [data.base=""] - The base string to append the result to.
 * @return {string} A human-readable string representation of the time. */
const parseTime = async (ms, data = {}) => {
    let base = data.base;
    const obj = data.fromNow
        ? (await parsems)(ms)
        : (await parsems)(Date.now() - ms);
    
    for (let i in obj) {
        if (
            obj[i] === 0 ||
            ["milliseconds", "microseconds", "nanoseconds"].includes(i) ||
			(!data.includeSeconds && i === "seconds")
        ) {
            continue;
        }

        base += `${obj[i]} ${
			obj[i] === 1 ? i.slice(0, -1) : i
		} `;
    }

    return !base ? "Just now" : base + "ago";
};

/**
 * Returns an object containing the length of the given integer and whether it was changed.
 *
 * @param {number} int - The input integer.
 * @return {{int: number, changed: (import("../../types/main").ITime)["changed"]}} An object containing the length of the input integer and whether it was changed. */
const getTimeLength = (int) => {
    const str = int.toString();
    let i = int;
    /** @type {(import("../../types/main").ITime)["changed"]} */
    let r = "none";

    if (str.length === 1) {
        if ([6, 7, 8, 9].includes(i)) {
            i = 10;
            r = "raised";
        }
        if ([1, 2, 3, 4].includes(i)) {
            i = 5;
            r = "lowered";
        }

        return { int: i, changed: r };
    }

    return { int: i, changed: "none" };
};

/**
 * Returns the maximum allowed time, capping at 600 if the input exceeds it.
 *
 * @param {number} int - The input time to be capped.
 * @return {number} The capped time, either the original input or 600. */
const getMaxTime = (int) => {
    const max = 172800;

    if (int > max) {
        const toMinus = int - max;

        return int - toMinus;
    } else return int;
};

/**
 * Counts down from a specified start time, decrementing by 5 seconds every 5 seconds.
 *
 * @param {number} start - The start time to count down from.
 * @return {Promise<import("../../types/main").ITime>} An object representing the time state, including the current time and whether the count has completed.4 */
const countDown = async (start) => {
    const s = getTimeLength(start);
    let ss = s.int;

    while (ss > 0) {
        await Sleep(5 * 1000);

        ss = ss - 5;
    }

    return {
        state: ss === 0 ? "Completed" : "In Progress",
        changed: s.changed,
        current_time: s.int
    };
};

/**
 * Counts up to a specified end time, incrementing by 5 seconds every 5 seconds.
 *
 * @param {number} end - The end time to count up to.
 * @return {ITime} An object representing the time state, including the current time and whether the count has completed. */
const countUp = async (end) => {
    const e = getTimeLength(end);
    const ee = e.int;
    let s = 0;
    const maxEnd = getMaxTime(ee);

    while (s < maxEnd) {
        await Sleep(5 * 1000);

        s = s + 5;
    }

    return {
		state: s === maxEnd ? "Completed" : "In Progress",
		changed: e.changed,
		current_time: s,
	};
};

const FooterTime = moment(Date.now()).format(
    "[The] Do [of] MMMM YYYY [@] h:mm:ss A"
);
const FooterText = `Requested at ${FooterTime}`;

/**
 * Formats a given time in milliseconds into a human-readable string.
 *
 * @param {number} ms - The time in milliseconds to be formatted.
 * @return {string} A human-readable string representation of the time. */
const CurrentFormattedTime = (ms) => {
    return moment(ms).format("Do [of] MMMM YYYY [@] h:mm:ss A");
};

/**
 * Formats a given time in milliseconds into a Discord-readable string.
 * 
 * @param {number} ms - The time in milliseconds to be formatted.
 * @param {"Minimal" | "Average" | "Long"} type
 * @return {string} A human-readable string representation of the time. */
const DiscordTimestamp = (ms, type) => {
    let seconds = ms / 1000;
    let time = "";
    
    switch (type) {
        case "Minimal":
            time = `<t:${seconds}:d> <t:${seconds}:t>`;
            break;

        case "Average":
            time = `<t:${seconds}:f>`;
            break;
        
        case "Long":
            time = `<t:${seconds}:F>`;
            break;
    }

    return time;
};

const DiscordTimestampAgo = (ms, type) => {
    let seconds = ms / 1000;
    
    return `<t:${seconds}:R>`;
};

module.exports = {
    Sleep,
    parseTime,
    getTimeLength,
    getMaxTime,
    countDown,
    countUp,
    FooterText,
    CurrentFormattedTime,
    DiscordTimestamp,
    DiscordTimestampAgo
};