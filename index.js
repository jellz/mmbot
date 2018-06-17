const { Client } = require('klasa');
const { token } = require('./config.json');

const client = module.exports = new Client({
    clientOptions: {
        disableEveryone: true
    },
    prefix: '%',
    disabledCorePieces: ['commands'],
    cmdEditing: true,
    typing: false,
    gateways: {
        guilds: { provider: 'rethinkdb' },
        users: { provider: 'rethinkdb' },
        clientStorage: { provider: 'rethinkdb' }
    },
    providers: { rethinkdb: { db: 'mmbot' } },
    readyMessage: (client) => client.user.tag + ' is ready :)'
});
client.login(token);

require('./web/web.js')();