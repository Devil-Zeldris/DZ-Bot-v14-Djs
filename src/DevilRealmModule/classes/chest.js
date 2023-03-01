const {EmbedBuilder, ButtonBuilder, ActionRowBuilder} = require("discord.js");

class TreasureChest {
    constructor(components, rewards, options) {
        // this._description = `[PH] Description of ${this._gui.components.name}`
        this._reward = {
            name: components.name,
            money: rewards.money,
            exp: rewards.experience,
            loot: rewards.loot
        }
        this._data = {
            name: components.name,
            cooldown: options.cooldown || 5000,
            chance: options.chance,
            rolls: options.rolls || 10
        }
        this._components = {
            image: components.image,
            name: components.name,
            description: `[PH] Description of ${components.name}`
        }
        this.id = [].concat(options.id);
    }
    open(rolls) {
    }
    async spawn(message) {
        const {description, image, name} = this._components;
        return message.channel.send({
            content: `Spawned ${name} treasure chest`,
            embeds: [
                new EmbedBuilder()
                .setColor(`#B69D7C`)
                .setDescription(description)
                .setThumbnail(image)
            ],
            components: [
                new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setCustomId(`${this.id[0]}`)
                        .setLabel(`Open`)
                        .setStyle(3),
                    new ButtonBuilder()
                .setCustomId(`possible_rewards`)
                .setLabel(`Possible Rewards`)
                .setStyle(2)]
            )
            ]
        })
    }
    get reward() {
        return this._reward
    }
    get data() {
        return this._data
    }
}
module.exports = TreasureChest;