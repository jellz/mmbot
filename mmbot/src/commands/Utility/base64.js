const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Convert normal text into Base 64',
            usage: '<query:str> [...]'
		});
	}

	async run(msg, [query]) {
        return msg.channel.send(Buffer.from(query, 'utf8').toString('base64'));
	}

};
