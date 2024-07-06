const Event = require("../../Lib/Base/Event");

module.exports = class ReadyEvent extends Event {
    constructor() {
        super({
            name: "ready",
            once: true
        });
    }

    execute() {
        // Code
    }
}