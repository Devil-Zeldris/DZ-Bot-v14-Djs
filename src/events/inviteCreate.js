const Event = require("../classes/event");
class InviteCreateEvent extends Event {
    constructor() {
        super('inviteCreate', false)
    }
    async execute(invite) {
        const { guild, code, inviter } = invite;
        guild.invites.cache.set(code, invite)
        console.log(`[INVITE]`, `Invite ${code} (created by ${inviter?.tag}) added in cache`);
    }
}

module.exports = InviteCreateEvent;