const DirectMessages = require("../classes/direct");
class GuildDirectMessagesChat extends DirectMessages {
    constructor() {
        super([11, 12])
    }
    async typing(typing) {
        const { user, client } = typing;
        if (user.bot) return;
        let userDM = await client.users.fetch(typing.channel.name)
        if (!userDM.dmChannel) await userDM.createDM();
        return userDM.dmChannel.sendTyping().catch()
    }
    //(channel.id !== this.directMessagesChatId)
    async execute(message) {
        let { author, channel } = message
        let user = await message.client.users.fetch(channel.name)
        if (author.bot) return;
        if (!user.dmChannel) await user.createDM();
        return user?.send({
            content: message.content,
            files: [...message.attachments.values()],
            stickers: message.stickers
        }).catch()
    }
}

module.exports = GuildDirectMessagesChat;
