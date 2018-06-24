const { Command, util } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Skip the current song',
            permissionLevel: 4
        });
	}

	async run(msg) {
        if (!msg.guild.voiceConnection) return msg.reply('I\'m not playing anything right now!');
        if (!msg.member.voiceChannel) return msg.reply('you must be in a voice channel to use this command!');
		return msg.reply(`force skipping is also disabled for the time being. If you need to want to stop the music, use **${msg.guild.configs.prefix}stop**.`);
	}

};
