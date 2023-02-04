const Event = require("../classes/event");

class WarnEvent extends Event {
    constructor() {
        super('warn', false)
    }
    execute(info) {
        console.log(`[WARN]`, info)
    }
}
module.exports = WarnEvent;