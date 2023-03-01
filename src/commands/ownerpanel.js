const Command = require("../classes/command");
class OwnerPanelCommand extends Command {
    constructor() {
        super([
            'updateGuildCommands',
            'updateGlobalCommands',
            'resetCommands',
            'createGuildCommands',
            'createGlobalCommands',
            'panel'
        ])
    }
    async execute(interaction) {
        const { customId, commandName, member } = interaction
        if (member.id !== this.ownerID) return interaction.reply({ content: `You aren't @Devil_Zeldris for use ${commandName} command` })
        const commands = {
            'updateGuildCommands': this.#updateGuildCommands,
            'updateGlobalCommands': this.#updateGlobalCommands,
            'resetCommands': this.#resetCommands,
            'createGuildCommands': this.#createGuildCommands,
            'panel': this.#createPanel
        }
        await commands[commandName](interaction)
    }
    async #createPanel(interaction) {
        const { embeds, components } = await interaction.client.database
            .collection('embeds')
            .findOne({ name: 'Owner Panel' }, { projection: { _id: 0 } });
        await interaction.reply({
            embeds,
            components,
            ephemeral: true
        })
    }
    async #updateGuildCommands(interaction) {
        const { client, guild } = interaction
        let commandsDB = await client.database.collection('commands')
            .find({ $or: [{ guildIds: guild.id }, { guildIds: "any" }] }, { projection: { _id: 0, guildIds: 0 } })
            .toArray()
        await guild.commands.set(commandsDB, interaction.guildId)
        return interaction.reply({ content: `Commands has been updated in Guild ${interaction.guild.name}: ID ${interaction.guild.id}`, ephemeral: true })
    }
    async #updateGlobalCommands(interaction) {
        const { client } = interaction
        let commands = await client.database.collection('commands').find({ scope: 'GLOBAL' }, { projection: { _id: 0, scope: 0, guildIds: 0 } })
        await client.application.commands.set(commands, interaction.guildId)
    }
    async #resetCommands(interaction) {
        const { client } = interaction;
        await client.application.commands.set([]);
        await client.guilds.fetch().then(guilds => {
            guilds.forEach(async guild => {
                await client.application.commands.set([], guild.id);
                console.log(`[PANEL]`, `Commands from guild ${guild.id} : ${guild.name} deleted`)
            })
        })
        return interaction.reply({ content: `[PANEL] Commands are deleted now`, ephemeral: true })
    }
    async #createGuildCommands(interaction) {
        const { client, guild } = interaction
        let commandsDB = await client.database.collection('commands').find({ $or: [{ "guildIds": guild.id }, { "guildIds": "any" }] }, { projection: { _id: 0, scope: 0, guildIds: 0 } }).toArray()
        await guild.commands.set(commandsDB, interaction.guildId)
        return interaction.reply({ content: `[PANEL] Commands has been created in Guild ${interaction.guild.id}`, ephemeral: true })
    }
}
module.exports = OwnerPanelCommand;
