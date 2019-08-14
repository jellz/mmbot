const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Reverse text',
            usage: '<query:str> [...]'
		});
	}

	async run(msg, [query]) {
      	return msg.channel.send(query.split('').reverse().join(''));
	}

};
