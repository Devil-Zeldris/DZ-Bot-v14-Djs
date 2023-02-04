const Event = require('../classes/event');
const handler = new (require('../classes/handler'));
class InteractionCreateEvent extends Event {
    constructor() {
        super('interactionCreate', false);
        this.commands = handler.commands;
    }
    async execute(interaction) {
        const { commandName, customId } = interaction;
        let command = this.commands[commandName || customId];
        if (command) return command.execute(interaction);
    }
}

module.exports = InteractionCreateEvent;