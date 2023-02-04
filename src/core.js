require('dotenv').config();
const DevilZeldrisClient = require('./classes/client');
const { intents, partials } = require('./config.json')
const client = new DevilZeldrisClient(
    {
        intents,
        partials,
        token: process.env.token,
        url: process.env.DBUrl,
        failIfNotExists: false
    }
);

client.init()
    .then(() => console.log(`[INIT]`, `All systems initiated`))
    .catch(error => console.log(`[INIT]`, error));