const DirectMessages = require("../classes/direct");
const { guildId, dmChannel } = require('../config.json')
class GuildDirectMessagesChat extends DirectMessages {
    constructor() {
        super([11, 12])
    }
    async typing(typing) {
        if (typing.user.bot || (typing.channel.id !== this.directMessagesChatId)) return;
        const user = await typing.client.users.fetch(typing.channel.name)
        const dmChannel = await user.createDM()
        return dmChannel.sendTyping().catch(() => undefined)
    }
    async execute(message) {
        if (message.author.bot || (message.channel.id !== this.directMessagesChatId)) return;
        const user = await message.client.users.fetch(message.channel.name)
        return user.send({
            content: message.content,
            files: [...message.attachments.values()],
            stickers: message.stickers
        }).catch(() => undefined)
    }
}

module.exports = GuildDirectMessagesChat;