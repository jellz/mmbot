const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true
        });
    }

    run(...params) {
        this.client.user.setActivity(`for @${this.client.user.username} | ${this.client.guilds.size} servers`, { type: 'WATCHING' });
        this.client.musicQueues = {};
    }

};