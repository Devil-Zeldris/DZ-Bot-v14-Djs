const Event = require("../classes/event");
class InviteDeleteEvent extends Event {
    constructor() {
        super('inviteDelete', false)
    }
    async execute(invite) {
        const { guild, code } = invite
        console.log(`[INVITE]`, `Invite ${code} (created by ${guild.invites.cache.get(code)?.inviterId}) remove from cache`);
        guild.invites.cache.delete(code)
    }
}

module.exports = InviteDeleteEvent;