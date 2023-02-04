const Event = require("../classes/event");
class GuildCreateEvent extends Event {
    constructor() {
        super('guildCreate', false)
    }
    async execute(guild) {
    }
}

module.exports = GuildCreateEvent;