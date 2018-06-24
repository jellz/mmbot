const { Command, util } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Fix mmbot\'s music system',
            permissionLevel: 4
        });
	}

	async run(msg) {
        this.client.musicQueues[msg.guild.id] = [];
        msg.guild.voiceConnection.disconnect();
        return msg.reply('I have attempted to fix the music system. If the issue persists, please join the support server and tell us.');
	}

};
