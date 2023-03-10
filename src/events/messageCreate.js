const Event = require("../classes/event");
const handler = new (require("../classes/handler").Handler);

class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', false);
        this.direct = handler.direct
    }
    async execute(message) {
        const { channel } = message;
        const chat = this.direct.get(channel.type)
        if (chat) return chat.execute(message);
    }
}

module.exports = MessageCreateEvent;
