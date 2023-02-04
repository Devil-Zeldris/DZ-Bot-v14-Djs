class Event {
    constructor(name, once) {
        this.name = name;
        this.once = once;
    }
    async execute() { }
};
module.exports = Event;