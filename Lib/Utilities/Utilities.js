const fs = require("fs");
const { resolve } = require("path");
const moment = require("moment");
const WaterMelonClient = require("../Core/Client");

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

/**
 * @template T
 * @param {T[]} array
 * @param {number} page
 * @param {number} perPage */
const Paginate = (array, page = 1, perPage = 10) => {
    const duplicate = array.slice();
    const start = (page - 1) * perPage;
    const p =
        duplicate.length > perPage
            ? duplicate.slice(start, start + perPage)
            : duplicate;

    return {
        current: p,
        amount: p.length,
        display: `${page}/${p.length}`,
    };
};

/** 
 * @param {import("discord.js").PermissionsString | import("discord.js").PermissionsString[]} permission
 * @returns {string} */
const permissionSpacesSingular = (permission) => {
	return permission.replace(/([a-z])([A-Z])/g, "$1 $2");
};

/** @param {import("discord.js").PermissionsString[]} permissions */
const permissionSpacesMultiple = (permissions) => {
	const arr = [];

	permissions.forEach((perm) => arr.push(permissionSpacesSingular(perm)))

	return arr.join(", ");
};

const developerID = "671374842951630858";
/** @param {WaterMelonClient} client */
const developer = (client) => client.users.fetch(developerID);

module.exports = {
    writeJSON,
    readFromJSON,
    isClass,
	Paginate,
	permissionSpacesSingular,
	permissionSpacesMultiple,
	developerID,
	developer
};
