const DirectMessages = require("../classes/direct");

class GuildDirectMessagesChat extends DirectMessages {
    constructor() {
        super([11, 12])
    }
    async typing(typing) {
        if (typing.user.bot) return;
        const user = await typing.client.users.fetch(typing.channel.name)
        const dmChannel = await user.createDM()
        return dmChannel.sendTyping()
    }
    async execute(message) {
        if (message.author.bot) return;
        const user = await message.client.users.fetch(message.channel.name)
        return user.send({
            content: message.content,
            files: [...message.attachments.values()],
            stickers: message.stickers
        })
    }
}

module.exports = GuildDirectMessagesChat;