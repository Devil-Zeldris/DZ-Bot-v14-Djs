const TreasureChest = require('../classes/chest')
class SilverTreasureChest extends TreasureChest {
    constructor() {
        super({
            name: 'Silver Chest',
            image: `https://i.imgur.com/NqzFa3o.png`,
            },
            {
                experience: 150,
                money: 750,
                loot: []
            },
            {
                cooldown: 5000,
                chance:0.25,
                id:`silver_chest`
            })

    }
}
module.exports = SilverTreasureChest;