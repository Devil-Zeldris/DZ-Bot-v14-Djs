const Direct = require("../classes/direct");
const { ThreadAutoArchiveDuration } = require('discord.js')

class DirectMessagesChat extends Direct {
    constructor() {
        super(1);
    }
    async typing(typing) {
        const { client, user } = typing;
        const DMChannel = await client.channels.fetch(this.directMessagesChatId)
        const activeThread = await DMChannel.threads.fetchActive()
        const archivedThread = await DMChannel.threads.fetchArchived()
        const DMThread = activeThread.threads.find(thread => thread.name === user.id) || archivedThread.threads.find(thread => thread.name === user.id);
        return DMThread?.sendTyping().catch()
    }
    async execute(message) {
        const { author, client, attachments, stickers } = message;
        if (author.bot) return;
        const privateChannels = await client.channels.fetch(this.directMessagesChatId)
        const activeThreads = await privateChannels.threads.fetchActive()
        const archivedThreads = await privateChannels.threads.fetchArchived()
        const hook = (await privateChannels.fetchWebhooks()).find(({ owner }) => owner === client.user) || (await privateChannels.createWebhook({
            name: `Direct Messages`,
            avatar: `https://media.discordapp.net/attachments/761694168758091797/1066049588433264772/pngaaa.com-1423371.png`,
            reason: `Creates direct messages chats`
        }))
        const DMThread = activeThreads.threads.find(thread => thread.name === author.id) || archivedThreads.threads.find(thread => thread.name === author.id) || await privateChannels.threads.create({
            name: author.id,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            reason: 'A new DM channel'
        })
        const { username } = author;
        const { id: threadId } = DMThread
        return hook.send({
            username,
            avatarURL: author.avatarURL({ format: 'png', size: 4096, dynamic: true }),
            threadId,
            content: message.content.length === 0 ? undefined : message.content,
            files: [...attachments.values()],
            stickers
        })
    }
}
module.exports = DirectMessagesChat;
