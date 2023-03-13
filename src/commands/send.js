const { setTimeout } = require('timers/promises')
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const Command = require("../classes/command");
class SendCommand extends Command {
    constructor() {
        super(['send', 'Actions With Message', 'actions'])
        this.targetMessage;
    }
    async execute(interaction) {
        if (interaction.member.id !== this.ownerID) return interaction.reply({ content: `You dont have permissions` })
        const { commandName, customId, values, targetMessage } = interaction
        const action = {
            'pin': this.#pin,
            'reply': this.#reply,
            'delete': this.#delete,
            'edit': this.#edit
        }
        switch (customId || commandName) {
            case 'send':
                return this.#send(interaction);
            case 'Actions With Message':
                this.targetMessage = targetMessage
                return this.#actionsWithMessage(interaction)
            case 'actions':
                return action[values[0]](interaction, this.targetMessage)
        }
    }
    async #send(interaction) {
        const { options, channel, client } = interaction
        const content = options.getString('message')
        const files = options.getAttachment('file') ? [options.getAttachment('file')] : []

        const user = options.getUser('user')
        if (user) {
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) return interaction.reply({ content: `Can't manage webhooks`, ephemeral: true })
            const hook = (await channel.fetchWebhooks()).find(({ owner }) => owner === client.user) || (await channel.createWebhook({ name: `Piety Curse`, avatar: `https://media.discordapp.net/attachments/761694168758091797/1065642907308134470/Piety_Purple-1024.png`, reason: `Someone has been cursed` }).catch(console.error))
            await hook.send({ username: user.username, avatarURL: user.avatarURL({ format: 'png', size: 4096, dynamic: true }), content, files })
            return interaction.reply({ content: `Completed`, ephemeral: true })
        }
        await interaction.deferReply({ ephemeral: true });
        await channel.sendTyping();
        await setTimeout(3000);
        await channel.send({ content, files })
        return interaction.editReply({ content: `Command success` });
    }
    async #actionsWithMessage(interaction) {
        const actions = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId('actions')
                .setOptions([
                    {
                        label: 'Reply',
                        value: 'reply',
                        description: '[OWNER] Reply to the message',
                        emoji: { id: '1069665061318180934', name: 'reply' }
                    },
                    {
                        label: 'Pin/Unpin Message',
                        value: 'pin',
                        description: '[OWNER] Pin the message',
                        emoji: { id: '1069665056444399626', name: 'pin' }
                    },
                    {
                        label: 'Delete',
                        value: 'delete',
                        description: '[OWNER] Delete the message',
                        emoji: { id: '1069667300816466020', name: 'delete' }
                    },
                    {
                        label: 'Edit',
                        value: 'edit',
                        description: '[OWNER] Edit the message',
                        emoji: { id: '1070412128592343130', name: 'edit' }
                    }
                ])
            )
        await interaction.reply({ components: [actions], ephemeral: true })
    }
    async #reply(interaction, targetMessage) {
        const { channel } = interaction
        const reply = new ActionRowBuilder()
            .addComponents(new TextInputBuilder()
                .setCustomId('reply')
                .setLabel('Message for sending')
                .setStyle(2)
                .setMinLength(1)
                .setMaxLength(4000))
        const modal = new ModalBuilder()
            .setCustomId('replyToMessage')
            .setTitle('Replying to message')
            .addComponents(reply);
        await interaction.showModal(modal)
        const modalSubmitInteraction = await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === 'replyToMessage', time: 600000 }).catch();
        await modalSubmitInteraction.deferReply({ ephemeral: true })
        await modalSubmitInteraction.channel.sendTyping();
        await setTimeout(3000);
        const { fields } = modalSubmitInteraction
        const content = fields.getTextInputValue('reply')
        await channel.send({ content, reply: { messageReference: targetMessage?.id } })
        await modalSubmitInteraction.editReply({ content: `Command success`, ephemeral: true })
    }
    async #pin(interaction, targetMessage) {
        if (!targetMessage) return interaction.reply({ content: `No message for pin`, ephemeral: true })
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages, true)) return interaction.reply({ content: `You don't have permission to pin messages`, ephemeral: true })
        if (targetMessage.pinned) {
            await targetMessage.unpin(`Pinned message ${targetMessage.content}`).catch(async () => await interaction.reply({ content: `Message deleted already`, ephemeral: true }))
            return interaction.reply({ content: `Message ID: ${targetMessage.id} has unpinned`, ephemeral: true })
        }
        await targetMessage.pin(`Pinned the message by ID: ${targetMessage.id}`)
        return interaction.reply({ content: `Pinned message ${targetMessage.content.substring(0, 40)}...`, ephemeral: true })
    }
    async #delete(interaction, targetMessage) {
        if (!targetMessage) return interaction.reply({ content: `No message for delete`, ephemeral: true })
        await targetMessage.delete().catch(async () => interaction.reply({ content: `Message deleted already`, ephemeral: true }))
        return interaction.reply({ content: `Message deleted`, ephemeral: true })
    }
    async #edit(interaction, targetMessage) {
        if (!targetMessage) return interaction.reply({ content: `No message for editing`, ephemeral: true })
        const edit = new ActionRowBuilder()
            .addComponents(new TextInputBuilder()
                .setCustomId('edit')
                .setLabel('Text for editing')
                .setStyle(2)
                .setMinLength(1)
                .setMaxLength(4000))
        const modal = new ModalBuilder()
            .setCustomId('editMessage')
            .setTitle('Editing message')
            .addComponents(edit);
        await interaction.showModal(modal)
        const modalSubmitInteraction = await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === 'editMessage', time: 60000 });
        const { fields } = modalSubmitInteraction;
        const content = fields.getTextInputValue('edit');
        if (interaction.guild.members.me.id !== targetMessage.member.id) return interaction.reply({ content: `You can't edit this message`, ephemeral: true })
        let message = await targetMessage.edit({ content }).catch(() => undefined)
        if (!message) return modalSubmitInteraction.reply({ content: `Message deleted already`, ephemeral: true })
        return modalSubmitInteraction.reply({ content: `Message edited`, ephemeral: true })
    }
}
module.exports = SendCommand;
