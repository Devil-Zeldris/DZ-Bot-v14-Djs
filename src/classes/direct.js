class Direct {
    constructor(type) {
        this.type = [].concat(type);
        this.directMessagesChatId = process.env.DM_ID
    }
    execute() { }
}
module.exports = Direct;