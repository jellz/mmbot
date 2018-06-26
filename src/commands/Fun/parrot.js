const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get a random parrot (parrots provided by Cookieblob)',
		});
	}

	async run(msg) {
		return msg.channel.send(this.client.guilds.get('393781962545954817').emojis.random(1).toString());
	}

};
