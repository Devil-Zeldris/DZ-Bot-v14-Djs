const TreasureChest = require('../classes/chest')
class LegendaryTreasureChest extends TreasureChest {
    constructor() {
        super({
                name: 'Legendary Chest',
                image: `https://i.imgur.com/NqzFa3o.png`,
            },
            {
                experience: 1000,
                money: 15000,
                loot: []
            },
            {
                cooldown: 5000,
                id: `legendary_chest`,
                chance: 0.05
            }
        )
        //super({ name: 'Legendary Chest', cooldown: 5000, money: 15000, loot: [], experience: 1000, id: 'legendary_chest', chance:0.05 })
    }
}
module.exports = LegendaryTreasureChest;