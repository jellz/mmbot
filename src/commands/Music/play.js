const { Command } = require('klasa');
const { promisify } = require('util');
const { filterVideos, playNextSong } = require('../../musicUtil.js');
const search = promisify(require('youtube-search'));
const ytdl = require('ytdl-core');
const searchOptions = { maxResults: 5, key: require('../../../config.json').youtubeApiKey };

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['add'],
            runIn: ['text'],
			description: 'Play a song',
            usage: '<query:str>',
            requiredPermissions: ['SPEAK', 'CONNECT']
		});
	}

	async run(msg, [query]) {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel || msg.guild.voiceConnection && voiceChannel !== msg.guild.voiceConnection.channel) return msg.reply('you must be in a voice channel to play music!');

	    const permissions = voiceChannel.permissionsFor(msg.guild.me);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return msg.reply('I don\'t have the necessary permissions to join your voice channel (CONNECT & SPEAK).');

        if (!this.client.musicQueues[msg.guild.id]) this.client.musicQueues[msg.guild.id] = [];

        const results = await search(query, searchOptions);
        if (results < 1 || !results) return msg.reply(`no songs were found for query **${query}**`);
        const filtered = await filterVideos(results);
        if (filtered < 1) return msg.reply(`no songs were found for query **${query}**`);
        
        filtered[0].requestedBy = msg.member;
        const queueEmpty = this.client.musicQueues[msg.guild.id].length < 1;
        this.client.musicQueues[msg.guild.id].push(filtered[0]);
        msg.reply(`queued **${filtered[0].title}** by **${filtered[0].channelTitle}**`)
        if (queueEmpty) return await playNextSong(this.client, msg.guild, msg.member.voiceChannel, msg.channel);
	}

};
