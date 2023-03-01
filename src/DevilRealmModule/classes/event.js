class DREvent {
    constructor(options) {
        this.name = options.name;
        this.once = options.once || false;
    }
}
module.exports = {DREvent};