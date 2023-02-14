class Command {
    constructor(cmd) {
        this.cmd = [].concat(cmd);
        this.ownerID = process.env.OWNER_ID;
    }
    execute(interaction) { }
}

module.exports = Command;
