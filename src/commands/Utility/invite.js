const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: 'Get mmbot\'s invite link'
		});
	}

	async run(msg) {
		return msg.channel.send(`You can invite mmbot using this link: <https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot>`);
	}

};
