const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['av', 'pfp'],
			description: 'Get link to user\'s avatar',
			usage: '[user]'
		});
	}

	async run(msg, [user]) {
		return msg.channel.send(user ? user.displayAvatarURL() : msg.author.displayAvatarURL());
	}

};