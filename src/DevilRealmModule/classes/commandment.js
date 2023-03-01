const {Command} = require('../../classes/command')
class Commandment extends Command {
    constructor(cmd) {
        super()
        this.cmd = [].concat(cmd)
        this.type = 'commandment'
    }
}
module.exports = Commandment;