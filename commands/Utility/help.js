const { Command, util } = require('klasa');
const { baseUri } = require('../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands', 'helpme'],
			guarded: true,
			description: 'You need help? We\'ve got you covered',
		});
	}

	async run(msg) {
		return msg.channel.send(`View the full list of commands at **${baseUri}/docs**.\nIf you still need help, join the support server at https://discord.gg/CdaSWx6`);
	}

};
