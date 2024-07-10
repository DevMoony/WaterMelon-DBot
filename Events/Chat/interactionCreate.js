const Event = require("../../Lib/Base/Event");

/** This event will be used for interacting with slash commands and more */
module.exports = class InteractionCreateEvent extends Event {
    constructor() {
        super({
            name: "interactionCreate",
            once: false
        });
    }

    async execute(interaction) {
        
    }
}