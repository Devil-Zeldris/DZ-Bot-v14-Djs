const Command = require("../classes/command");
const {ThreadAutoArchiveDuration} = require('discord.js')
class MessageEmbedsCommand extends Command {
    constructor() {
        super('embed')
    }
    async execute(interaction) {
        if (interaction.member.id !== this.ownerID) return interaction.reply({ content: `You dont have permissions` })
        const { client, options, channel } = interaction
        const hook = (await channel.fetchWebhooks()).find(({ owner }) => owner === client.user) || (await channel.createWebhook({ name: `Piety Curse`, avatar: `https://media.discordapp.net/attachments/761694168758091797/1065642907308134470/Piety_Purple-1024.png`, reason: `Someone has been cursed` }))
        const collection = await client.database.collection('embeds')
        await interaction.deferReply({ ephemeral: true })
        if (options.getBoolean('update')) {
            await this.#update({ interaction, collection, hook })
            return interaction.editReply({ content: `Message updated`, ephemeral: true })
        }
        await this.#put({ interaction, collection, hook })
        return interaction.editReply({ content: `Embed has been put into ${interaction.channel.name} chat` })
    }
    async #put({ interaction, collection, hook }) {
        const embed = await collection.findOne({ name: `${interaction.options.getString('name')}` }, { projection: { _id: 0, roles: 0, name: 0 } })
        if (!embed) return interaction.reply({ content: `No embed found`, ephemeral: true })
        const { channel, client } = interaction;
        const { username, avatarURL, content, embeds, components, thread } = embed
        if (!username) return channel.send({ content, embeds, components }).then(message => {
        if (thread) message.startThread({
            name: message.embeds[0].title,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            reason: `Create a new Thread at ${message.channel.name}`
        })})
            .catch(error => console.error)
        return hook.send({ username, avatarURL, content, embeds, components }).then(message => {
        if (thread) message.startThread({
            name: message.embeds[0].title,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            reason: `Create a new Thread at ${message.channel.name}`
        })})
            .catch(error => console.error)
    }
    async #update({ interaction, collection, hook }) {
        const { options, channel } = interaction;
        const messageDB = await collection.findOne({ name: `${interaction.options.getString('name')}` }, { projection: { _id: 0, roles: 0, name: 0 } })
        if (!messageDB) return interaction.editReply({ content: `No embed found`, ephemeral: true })
        const messageId = options.getString('message_id');
        const message = await channel.messages.fetch(messageId)
        const { content, embeds, components } = messageDB
        if (!message.author.flags) return hook.editMessage(message, { content, embeds, components }).catch(() => undefined)
        return message.edit({ content, embeds, components }).catch(() => undefined)
    }
}
module.exports = MessageEmbedsCommand;
