const { Command, util } = require('klasa');
const { webUri } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands', 'helpme'],
			guarded: true,
			description: 'You need help? We\'ve got you covered',
		});
	}

	async run(msg) {
		return msg.channel.send(`View the full list of commands at **${webUri}/commands**.\nView the in-depth documentation at **${webUri}/go/docs**.\n\nIf you still need help, join the support server at https://discord.gg/CdaSWx6`);
	}

};
