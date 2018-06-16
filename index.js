const { Client } = require('klasa');
const { token, ownerId } = require('./config.json');

new Client({
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
}).login(token);