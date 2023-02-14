const { lstatSync, readdirSync } = require('node:fs');
const { join } = require('path');
const { Collection } = require('discord.js')

class Handler {
    constructor(client) {
        this.client = client;
        this._commands = new Collection()
        this._events = new Collection()
        this._direct = new Collection()
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
        return this._events = this.#walkSync(join(__dirname, `../events`))
            .map(file => new (require(file)))
    }
    get commands() {
        this.#walkSync(join(__dirname, '../commands'))
            .forEach(file => {
                let command = new (require(file));
                command.cmd.forEach(cmd => this._commands.set(cmd, command));
                console.log(`[HANDLER][COMMAND]`, `${command.cmd} is loaded`)
            })
        return this._commands;
    }
    get direct() {
        this.#walkSync(join(__dirname, '../direct_message'))
            .forEach(file => {
                let chat = new (require(file));
                chat.type.forEach(type => this._direct.set(type, chat));
                console.log(`[HANDLER][CHAT]`, `${chat.type} is added in Direct Messages`);
            })
        return this._direct

    }
}

module.exports = {
    Handler
};
