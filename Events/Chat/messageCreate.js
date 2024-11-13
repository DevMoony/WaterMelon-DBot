const { Message } = require("discord.js");
const Event = require("../../Lib/Base/Event");
const net = require("../../Lib/Core/Network");

module.exports = class MessageCreateEvent extends Event {
    constructor() {
        super({
            name: "messageCreate",
            once: false,
        });
    }

    /** @param {Message} message  */
    async run(message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(message.client.prefix)) return;
        if (message.content === "") return;

        if (this.client.aiEnabled) {
            this.aiRun(message);
            return;
        }
    }

    /** @param {Message} message  */
    async aiRun(message) {
        // Reads the content of the message.
        const words = message.content;

        // Remove everything but letters.
        const sentence = words.replace(/[^a-zA-Z ]+/g, "").toLowerCase();

        // Sends the reply to the channel.
        message.reply({
            content: reply(net.run(sentence)),
            allowedMentions: {
                repliedUser: false,
            },
        });
    }
};

// Response Arrays
// These lists can be added to for more
// randomness in the responses.
const hello_reply = ["hi", "sup?", "yo", "hello"];
const bye_reply = ["bye", "cya", "good bye"];
const lol_reply = ["lol", "lmao", "heh", "funny"];
const weather_reply = [
    "yes what a nice day it is today",
    "how is it outside where you are?",
    "thats perfect weather",
];
const yes_reply = ["thats the spirit", "ok then", "i agree"];
const no_reply = ["why not?", "NO!", "YES!", "ok then"];
const help_reply = [
    "id help you but im just a bot",
    "is there anyone who can assist?",
    "Id like to help.",
];

// This function takes the output of the ANN
// and returns a random reply string based
// on that topic. If there is no match it
// returns a thinking emoji.
const reply = (intent) => {
    // If the intent is blank for some reason, return a thinking emoji.
    if (intent === "") return ":thinking:";

    // Used to build a return sentence.
    let retstr = "";

    // The neural net will generate a number between 1-8
    // which should correspond to a topic.
    // If it doesn't recognise the intent for some reason
    // it will return a thinking emoji.
    switch (parseInt(intent)) {
        case 1:
            retstr =
                hello_reply[Math.floor(Math.random() * hello_reply.length)];
            break;
        case 2:
            retstr = bye_reply[Math.floor(Math.random() * bye_reply.length)];
            break;
        case 3:
            retstr = lol_reply[Math.floor(Math.random() * lol_reply.length)];
            break;
        case 4:
            retstr =
                weather_reply[Math.floor(Math.random() * weather_reply.length)];
            break;
        case 5:
            retstr = yes_reply[Math.floor(Math.random() * yes_reply.length)];
            break;
        case 6:
            retstr = no_reply[Math.floor(Math.random() * no_reply.length)];
            break;
        case 7:
            retstr = greeting();
            break;
        case 8:
            retstr = help_reply[Math.floor(Math.random() * help_reply.length)];
            break;
        default:
            retstr = ":thinking:";
            break;
    }

    return retstr;
};

// This function returns a random greeting reply.
const greeting = () => {
    const terms = ["how are you?", "hows it going?", "how are you doing?"];

    let str = "";
    str += terms[Math.floor(Math.random() * terms.length)] + " ";

    if (Math.random() >= 0.8) {
        str += "I dont know about ";
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                str += "everyone else but ";
                break;
            case 1:
                str += "you but ";
                break;
            case 2:
                str += "them but ";
                break;

            default:
                break;
        }
    }

    str += "im ";

    if (Math.random() >= 0.7) {
        const things = ["feeling ", "doing ", "being ", "genuinely "];
        str += things[Math.floor(Math.random() * things.length)];
    }

    const feelings = [
        "great. ",
        "playful. ",
        "calm. ",
        "confident. ",
        "courageous. ",
        "peaceful. ",
        "tragic. ",
        "neutral. ",
        "anxious. ",
        "pained. ",
        "wary. ",
    ];

    str += feelings[Math.floor(Math.random() * feelings.length)];

    if (Math.random() >= 0.8) {
        const reasons = ["for some reason ", "just because ", "becasue i can "];
        str += reasons[Math.floor(Math.random() * reasons.length)];
    }

    if (Math.random() >= 0.5) {
        str += "thanks for asking. ";
    } else {
        str += ". ";
    }

    return str;
};
