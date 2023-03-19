const Event = require("../classes/event");
const { Handler } = require("../classes/handler");

class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', false);
        this.direct = new Handler().direct
    }
    async execute(message) {
        const { channel } = message;
        const chat = this.direct.get(channel.type)
        if (chat) return chat.execute(message);
    }
}

module.exports = MessageCreateEvent;
