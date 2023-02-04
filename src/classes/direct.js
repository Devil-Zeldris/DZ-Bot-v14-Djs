const { DMId } = require('../config.json')
class Direct {
    constructor(type) {
        this.type = [].concat(type);
        this.directMessagesChatId = DMId
    }
    execute() { }
}
module.exports = Direct;