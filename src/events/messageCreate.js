const Event = require("../classes/event");
const handler = new (require("../classes/handler"));

class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', false);
        this.direct = handler.direct
    }
    async execute(message) {
        const { channel } = message;
        const chat = this.direct[channel.type]
        if (chat) chat.execute(message);
    }
}

module.exports = MessageCreateEvent;