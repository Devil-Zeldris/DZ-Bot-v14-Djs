const Event = require("../classes/event");
const {Handler} = require('../classes/handler');
class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', false);
        this.direct = new Handler().direct
    }
    async execute(message) {
        const {channel, author, client} = message;
        const chat = this.direct.get(channel.type)
        if (chat) return chat.execute(message);
        if (this.#spawnChest() && !author.bot) return client.emit('treasureChestSpawn', message);
    }
    #spawnChest() {
        const chests = [
            {
                chance: 0.3,
                type: true
            },
            {
                chance: 0.7,
                type: false
            }
        ]
        for (let i = 0, n = Math.random(); i < chests.length; n -= chests[i].chance, i++) if (n < chests[i].chance) return chests[i].type
    }
}
module.exports = MessageCreateEvent



