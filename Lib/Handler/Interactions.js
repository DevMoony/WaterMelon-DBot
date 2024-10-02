const { REST } = require("@discordjs/rest");
const { Routes, ChatInputCommandInteraction } = require("discord.js");
const { parse, resolve } = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));

