const fs = require("fs");
const { resolve } = require("path");
const moment = require("moment");

/**
 * Writes a key-value to the JSON file which has been specified by the file parameter.
 * 
 * @param {string} file - File to read/write.
 * @param {string} key - Key to assign a value to.
 * @param {*} value - Value to assign to the key. */
const writeJSON = (file, key, value) => {
    // Path to the file
    const f = resolve(process.cwd(), "Data", `${file}.json`);

    // Read existing content.
    const data = JSON.parse(fs.readFileSync(f, { encoding: "utf-8" }));

    // Add the new content.
    data[key] = value;

    fs.writeFileSync(f, JSON.stringify(data, null, 2));
};

/**
 * Returns the JSON file which has been specified by the file parameter, allowing you to read the JSON which has been returned.
 * 
 * @param {string} file - File to read.
 * @returns {any} - The data which has been found from the specified JSON. */
const readFromJSON = (file) => {
    // Path to the file
    const f = resolve(process.cwd(), "Data", `${file}.json`);

    // Return the existing data found in the JSON.
    return JSON.parse(fs.readFileSync(f, { encoding: "utf-8" }));
};

const isClass = (input) => {
	return (
		typeof input === "function" &&
		typeof input.prototype === "object" &&
		input.toString().substring(0, 5) === "class"
	);
};

const Colors = {
	Success: 0x0077ff,

	Success: 0x00f26d,
	Cancel: 0xef3f4c,
	Pushing: 0x2bb4eb,
	Blocked: 0xa83b35,
	Failed: 0xe82b3a,

	LowLatency: 0x0f89e3,
	NormalLatency: 0x0e6cf9,
	HighLatency: 0x0e2af9,

	LowRisk: 0xf2d100,
	MediumRisk: 0xff490c,
	HighRisk: 0xff200c,

	ToggleOff: 0xe92d3b,
	ToggleOn: 0x00d300,

	Settings: 0xa6a6a8,
	Guilds: 0x42a4ee,
	Bugs: 0xa6a7ab,
};

const Icons = {
	Success: "https://i.imgur.com/It9BNU8.png",

	Cancel: "https://i.imgur.com/U3HAPvp.png",
	Pushing: "https://i.imgur.com/tJgejcp.png",
	Blocked: "https://i.imgur.com/vlm4o6f.png",
	Failed: "https://i.imgur.com/HndJ0gv.png",

	LowLatency: "https://i.imgur.com/7Bi1miT.png",
	NormalLatency: "https://i.imgur.com/z4XR5BO.png",
	HighLatency: "https://i.imgur.com/uHZs7oz.png",

	LowRisk: "https://i.imgur.com/lQCdrh4.png",
	MediumRisk: "https://i.imgur.com/kGHdqBL.png",
	HighRisk: "https://i.imgur.com/Hc6OSpu.png",

	ToggleOff: "https://i.imgur.com/jMlPD2R.png",
	ToggleOn: "https://i.imgur.com/FLhQrUS.png",

	Settings: "https://i.imgur.com/BxFXaRr.png",
	Guilds: "https://i.imgur.com/xDR7eBr.png",
	Bugs: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_bug_report_48px-256.png",
};

module.exports = {
    writeJSON,
    readFromJSON,
    isClass,
    Colors,
    Icons
};