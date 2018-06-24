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
        msg.guild.voiceConnection.dispatcher.end();
        msg.guild.voiceConnection.disconnect();
	}

};
