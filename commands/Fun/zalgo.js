const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Convert normal text into zalgo text',
            usage: '<query:str> [...]'
		});
	}

	async run(msg, [query]) {
        return msg.channel.send('`' + require('to-zalgo')(query) + '`');
	}

};
