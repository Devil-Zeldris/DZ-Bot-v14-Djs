const Command = require('../classes/command.js');
class WarframeSelectMenu extends Command {
    constructor() {
        super(['lith_fissures', 'meso_fissures', 'neo_fissures', 'axi_fissures', 'requiem_fissures', 'game_roles', 'trigger_notifications']);
    }
    async execute(interaction) {
        if (interaction.isButton()) {
            let role = await interaction.guild.roles.fetch('1007557773158002739')
            if (interaction.member.roles.cache.has(role.id)) interaction.member.roles.remove(role.id);
            else interaction.member.roles.add(role.id)
        }
        if (interaction.isSelectMenu()) {
            interaction.component.options.forEach(async c => {
                let role = await interaction.guild.roles.fetch(c.value)
                if (interaction.values.includes(c.value)) interaction.member.roles.add(role);
                else if (interaction.member.roles.cache.has(role.id)) interaction.member.roles.remove(role)
            })
        }
        await interaction.reply({ content: `Роли обновлены.`, ephemeral: true })
    }
}
module.exports = WarframeSelectMenu;