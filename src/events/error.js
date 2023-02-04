
const Event = require('../classes/event')
class ErrorEvent extends Event {
    constructor() {
        super('error', false)
    }
    async execute({ stack }) {
        console.log(`[ERROR]`, stack)
    }
}
module.exports = ErrorEvent;