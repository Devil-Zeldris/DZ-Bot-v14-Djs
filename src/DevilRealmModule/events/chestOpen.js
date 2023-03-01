const {DREvent} = require('../classes/event')
const {DRHandler} = require("../classes/handler");
const {EmbedBuilder} = require('discord.js')
class ChestOpenEvent extends DREvent {
    constructor() {
        super({name: `treasureChestOpen`});
        this._chests = new DRHandler().treasureChests
    }
    async execute(interaction) {
        let chest = this._chests.get(interaction.customId)
        let loot = this.#getItems(chest)
        let items = Object.values(loot.reduce((acc, { name, count, rarity, image }) => {
            return acc[name]
                ? { ...acc, [name]: { name, count: count + acc[name].count, rarity, image } }
                : { ...acc, [name]: { name, count, rarity, image } }
        }, []))
        let result = items.map(item => ({name: item.name, value: `${item.image} x${item.count}`, inline: true}))
        console.log(items)
        // here a logic for writing the loot in database
        return interaction.reply({content: `Opened ${chest.data.name}. Received items below`,
            embeds: [new EmbedBuilder().setDescription(`Loot from ${chest.data.name}`).addFields(result)],
            ephemeral:true})
    }
    #getItems(chest) {
        if (chest.data.rolls <= 0) return []
        return Array.from({ length: chest.data.rolls }, () => {
            for (let i = 0, n = Math.random(); i < chest.reward.loot.length; n -= chest.reward.loot[i].chance, i++) if (n < chest.reward.loot[i].chance) return chest.reward.loot[i]
        });
    }
}
module.exports = ChestOpenEvent;