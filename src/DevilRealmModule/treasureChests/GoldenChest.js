const TreasureChest = require('../classes/chest')
class GoldenTreasureChest extends TreasureChest {
    constructor() {
        super({
            name: 'Golden Chest',
            image: `https://i.imgur.com/NqzFa3o.png`,
        },
            {
            experience: 50,
            money: 500,
            loot: []
        },
            {
            cooldown: 5000,
            id: `golden_chest`,
            chance: 0.2}
        )
    }
}
module.exports = GoldenTreasureChest;