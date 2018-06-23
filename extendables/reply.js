const { Extendable } = require('klasa');

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: ['Message'] });
    }

    extend(content) {
        return this.channel.send(`**${this.author.username}**, ${content}`);
    }

};