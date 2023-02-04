const DirectMessages = require("../classes/direct");
const { guildId } = require('../config.json')
class GuildDirectMessagesChat extends DirectMessages {
    constructor() {
        super([11, 12])
    }
    async typing(typing) {
        if (typing.user.bot) return;
        if (typing.guild.id !== guildId) return;
        const user = await typing.client.users.fetch(typing.channel.name)
        const dmChannel = await user.createDM()
        return dmChannel.sendTyping()
    }
    async execute(message) {
        if (message.author.bot) return;
        if (message.guild.id !== guildId) return;
        const user = await message.client.users.fetch(message.channel.name)
        return user.send({
            content: message.content,
            files: [...message.attachments.values()],
            stickers: message.stickers
        })
    }
}

module.exports = GuildDirectMessagesChat;