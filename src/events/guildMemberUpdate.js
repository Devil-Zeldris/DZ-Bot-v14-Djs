const Event = require("../classes/event");
const { Collection } = require('discord.js')
const { commandments, rolesForGive } = require('../config.json')
class GuildMemberUpdateEvent extends Event {
    constructor() {
        super('guildMemberUpdate', false)
        this.commandments = new Collection(commandments.map(c => [c.id, { name: c.name, subrole: c.subrole }]))
    }
    async execute(oldMember, newMember) {
        if (!newMember.pending && oldMember.pending) {
            await this.#giveTraceFromCommandment(newMember)
            await this.#addMemberToDb(newMember)
        }
    }
    async #giveTraceFromCommandment(member) {
        const { client, guild, roles } = member;
        const invite = client.invitedMemberCache.get(member.id)
        if (!invite) return;
        const inviter = await guild.members.fetch(invite.inviterId);
        const role = inviter.roles.cache.find(role => this.commandments.get(role.id));
        if (role) return roles.add([this.commandments.get(role.id).subrole, ...rolesForGive])
        return roles.add(rolesForGive)
    }
    async #addMemberToDb(member) {
        const { client, id, guild } = member;
        const users = await client.database.collection('users')
        const user = await users.findOne({
            id,
            guildId: guild.id
        }, { projection: { id: 1, guildId: 1 } })
        if (!user && member.guild.id === process.env.GUILD_ID) await users.insertOne({
            id,
            guildId: guild.id,
            coins: {
                name: 'Golden Coins',
                count: 10000
            },
            premiumCoins: {
                name: 'Jewels',
                count: 100
            },
            inventory: [],
            expirience: {
                level: 1,
                count: 0
            },
            status_effects: [],
            roles: []
        })
    }
}
module.exports = GuildMemberUpdateEvent;
