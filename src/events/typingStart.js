const handler = new (require("../classes/handler"));
const Event = require("../classes/event");
class TypingStartEvent extends Event {
    constructor() {
        super('typingStart', false)
        this.direct = handler.direct
    }
    async execute(typing) {
        const { channel } = typing;
        const typingChat = this.direct.get(channel.type)
        if (typingChat) return typingChat.typing(typing)
    }
}
module.exports = TypingStartEvent;