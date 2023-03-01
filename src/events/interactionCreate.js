const Event = require('../classes/event');
const {Handler} = require('../classes/handler');
const {DRHandler} = require(`../DevilRealmModule/classes/handler`)
const {Collection} = require('discord.js')
class InteractionCreateEvent extends Event {
    constructor() {
        super('interactionCreate', false);
        this.commands = new Handler().commands;
        this.chests = new DRHandler().treasureChests
    }
    async execute(interaction) {
        const { commandName, customId, client } = interaction;
        let command = this.commands.get(commandName || customId);
        let chest = this.chests.get(customId);
        if (command) return command.execute(interaction);
        if (chest) return client.emit('treasureChestOpen', interaction)
    }
}

module.exports = InteractionCreateEvent;
