const { Collection } = require('discord.js');
const Commandment = require('../classes/commandment')
const { commandments, guildDRId } = require('../config.json')
class CurseCommandment extends Commandment {
    constructor() {
        super('Curse That Member')
        this.commandments = new Collection(commandments.map(c => [c.id, { name: c.name, curse: c.curse, subrole: c.subrole }]))
    }
    async execute(interaction) {
        const targetRoles = interaction.targetMember.roles.cache;
        const curseRole = interaction.member.roles.find(role => this.commandments.get(role.id).curse)
        await interaction.deferReply({ ephemeral: true })
        if (!interaction.member.roles.cache.find(role => this.commandments.has(role.id)) || interaction.targetUser.bot) return interaction.editReply({ content: `You aren't Commandment for curse <@${interaction.targetMember.id || interaction.targetUser.id}>`, ephemeral: true })
        if (targetRoles.has(this.commandments.get(curseRole))) return interaction.editReply({ content: `Devil <@${interaction.targetMember.id}> has cursed already.`, ephemeral: true })
        await interaction.targetMember.roles.add(curseRole)
        await interaction.editReply({ content: `Member has cursed` })
    }
}
module.exports = CurseCommandment;