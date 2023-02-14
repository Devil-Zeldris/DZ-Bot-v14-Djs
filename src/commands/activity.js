const Command = require("../classes/command");

class ActivityCommand extends Command {
    constructor() {
        super('activity')
    }
    async execute(interaction) {
        const { options, client, member } = interaction;
        if (member.id !== this.ownerID) return interaction.reply({ content: `No permission for use this command` })
        client.user.setActivity({ name: options.getString('title'), url: options.getString('url'), type: Number(options.getString('type')) })
        return interaction.reply({ content: `Activity has been updated`, ephemeral: true });
    }
}

module.exports = ActivityCommand;
