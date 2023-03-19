const { Handler } = require("../classes/handler");
const Event = require("../classes/event");
class TypingStartEvent extends Event {
    constructor() {
        super('typingStart', false)
        this.direct = new Handler().direct
    }
    async execute(typing) {
        const { channel } = typing;
        console.log(channel.type)
        const typingChat = this.direct.get(channel.type)
        console.log(typingChat);
        if (typingChat) return typingChat.typing(typing)
    }
}
module.exports = TypingStartEvent;
