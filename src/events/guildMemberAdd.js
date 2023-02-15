const { PermissionsBitField } = require('discord.js');
const Event = require('../classes/event')
class GuildMemberAddEvent extends Event {
    constructor() {
        super('guildMemberAdd', false)
    }
    async execute(member) {
        if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;
        this.#getUsedInvite(member)
    }
    async #getUsedInvite(member) {
        const { guild, client } = member;
        const oldInvites = guild.invites.cache;
        const newInvites = await guild.invites.fetch({ cache: false });
        let invite = newInvites.find(i => i.uses > oldInvites.get(i.code).uses);
        oldInvites.set(invite.code, invite);
        return client.invitedMemberCache.set(member.id, invite)
    }
}
module.exports = GuildMemberAddEvent;
