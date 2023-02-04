const { ownerID } = require('../config.json')

class Command {
    constructor(cmd) {
        this.cmd = [].concat(cmd);
        this.ownerID = ownerID;
    }
    execute(interaction) { }
}

module.exports = Command;