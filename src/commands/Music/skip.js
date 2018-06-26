const { Command, util } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['next'],
			description: 'Pass a vote to skip the current song',
		});
	}

	async run(msg) {
        if (!msg.guild.voiceConnection) return msg.reply('I\'m not playing anything right now!');
        if (!msg.member.voiceChannel) return msg.reply('you must be in a voice channel to use this command!');
		return msg.reply(`vote-skipping is currently disabled. For now, you can force skip using **${msg.guild.configs.prefix}forceskip**.`);
	}

};
