const { Collection } = require("discord.js");
const Event = require("../classes/event");
class ReadyEvent extends Event {
    constructor() {
        super('ready', true)
    }
    async execute(client) {
        const { user, guilds } = client
        console.log(`[EVENT]`, `${this.name} as ${user.tag}`)
        const guild = await guilds.fetch(client.getGuildId())
        await guild.invites.fetch()
        await client.application.commands.set([{
            name: 'panel',
            type: 1,
            description: '[OWNER] Panel for settings'
        }])
    }
}
module.exports = ReadyEvent;
