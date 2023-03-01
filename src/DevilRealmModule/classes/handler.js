const { Collection } = require('discord.js')
const { lstatSync, readdirSync } = require('node:fs')
const { join } = require('node:path')
class DRHandler {
    constructor(client) {
        this._client = client;
        this._events = new Collection()
        this._commandments = new Collection()
        this._treasureChests = new Collection()
    }
    #walkSync(dir, files = []) {
        if (!lstatSync(dir).isDirectory()) {
            files.push(dir)
            return files;
        }
        readdirSync(dir).forEach(file => this.#walkSync(join(dir, file), files))
        return files;
    }
    get events() {
        return this._events = this.#walkSync(join(__dirname, `../events`)).map(file => new (require(file)))
    }
    get commandments() {
        this.#walkSync(join(__dirname, '../commands'))
            .forEach(file => {
                let command = new (require(file));
                command.cmd.forEach(cmd => this._commandments[cmd] = command);
                console.log(`[HANDLER][COMMANDMENT]`, `${command.cmd} is loaded`)
            })
        return this._commandments;
    }
    get treasureChests() {
        if (this._treasureChests.size !== 0) return this._treasureChests;
        this.#walkSync(join(__dirname, '../treasureChests')).forEach(file => {
         let chest = new (require(file));
         chest.id.forEach(id => this._treasureChests.set(id, chest))
         console.log(`[HANDLER][treasure]`, `${chest.data.name} loaded`)
     })
        return this._treasureChests
    }
}

module.exports = {DRHandler};