const TreasureChest = require('../classes/chest')
class WoodenTreasureChest extends TreasureChest {
    constructor() {
        super({
            name: 'Wooden Chest',
            image: `https://i.imgur.com/NqzFa3o.png`,
            },
            {
                experience: 50,
                money: 500,
                loot: [{
                    name: `Pumpkin's Key`,
                    count: 15,
                    chance: 0.45,
                    rarity: `Common`,
                    image: `<:Keys:992209755063980145>`
                },
                    {
                        name: `Fire of Realm`,
                        count: 25,
                        chance: 0.45,
                        rarity: `Common`,
                        image: `<:DevilRealmFlame:990085048076234802>`
                    },
                    {
                        name: 'Coins',
                        count: 20000,
                        chance: 0.1,
                        rarity: `Uncommon`
                    }]
            },
            {
                cooldown: 5000,
                id: 'wooden_chest',
                chance: 0.5
            })
    }
}
module.exports = WoodenTreasureChest;