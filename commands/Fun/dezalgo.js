const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Convert zalgo text into normal text',
            usage: '<query:str> [...]'
		});
	}

	async run(msg, [query]) {
        return msg.channel.send('`' + require('to-zalgo/banish')(query) + '`');
	}

};
