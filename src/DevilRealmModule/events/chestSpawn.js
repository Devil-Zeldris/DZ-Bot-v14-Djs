const { Collection} = require('discord.js')
const { DREvent } = require('../classes/event')
const { DRHandler } = require('../classes/handler')
class TreasureChestSpawn extends DREvent {
    constructor() {
        super({ name: 'treasureChestSpawn' })
        this._cooldowns = new Collection()
        this._chestsForSpawn = new DRHandler().treasureChests.map(chest => chest)
        }
    async execute(message) {
        return this.#getRandomChest(this._chestsForSpawn).spawn(message)
    }

    #getRandomChest(chest) {
        for (let i = 0, n = Math.random(); i < chest.length; n -= chest[i].data.chance, i++) if (n < chest[i].data.chance) return chest[i]
    }
}
module.exports = TreasureChestSpawn;