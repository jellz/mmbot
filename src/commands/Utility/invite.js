const { Command } = require('klasa');
const { webUri } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: 'Get mmbot\'s invite link'
		});
	}

	async run(msg) {
		return msg.channel.send(`You can invite mmbot using this link: <**${webUri}/go/invite**>`);
	}

};
