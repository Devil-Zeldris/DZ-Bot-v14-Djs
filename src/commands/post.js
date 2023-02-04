const Command = require("../classes/command");
class MessageEmbedsCommand extends Command {
    constructor() {
        super('embed')
    }
    async execute(interaction) {
        if (interaction.member.id !== this.ownerID) return interaction.reply({ content: `You dont have permissions` })
        const { client, options } = interaction
        const collection = await client.database.collection('embeds').catch(() => undefined)
        await interaction.deferReply({ ephemeral: true })
        if (options.getBoolean('update')) {
            await this.#update({ interaction, collection })
            return interaction.editReply({ content: `Message updated`, ephemeral: true })
        }
        await this.#put({ interaction, collection })
        return interaction.editReply({ content: `Embed has been put into ${interaction.channel.name} chat` })
    }
    async #put({ interaction, collection }) {
        const message = await collection.findOne({ name: `${interaction.options.getString('name')}` }, { projection: { _id: 0 } })
        if (!message) return interaction.reply({ content: `No embed found`, ephemeral: true })
        const { channel } = interaction;
        const hook = (await channel.fetchWebhooks()).find(({ owner }) => owner === client.user) || (await channel.createWebhook({ name: `Piety Curse`, avatar: `https://media.discordapp.net/attachments/761694168758091797/1065642907308134470/Piety_Purple-1024.png`, reason: `Someone has been cursed` }))
        const { username, avatarURL, content, embeds, components } = message
        if (username && avatarURL) return hook.send({ username, avatarURL, content, embeds, components })
        return interaction.channel.send({ content, embeds, components })
    }
    async #update({ interaction, collection }) {
        const messageDB = await collection.findOne({ name: `${interaction.options.getString('name')}` }, { projection: { _id: 0 } }).catch(() => undefined)
        if (!messageDB) return interaction.reply({ content: `No embed found`, ephemeral: true })
        const message = await interaction.channel.messages.fetch(messageId)
        const messageId = options.getString('message_id');
        const { options } = interaction;
        const { content, embeds, components } = messageDB
        return message.edit({ content, embeds, components })
    }
}
module.exports = MessageEmbedsCommand;