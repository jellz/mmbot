const { Command, util } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Terminate the current voice connection',
            permissionLevel: 4
        });
	}

	async run(msg) {
        if (!msg.guild.voiceConnection) return msg.reply('I\'m not playing anything right now!');
        if (!msg.member.voiceChannel) return msg.reply('you must be in a voice channel to use this command!');
        msg.guild.me.voiceChannel.leave();
        this.client.musicQueues[msg.guild.id] = [];
        return msg.reply('cleared the queue and left the voice channel.');
	}

};
