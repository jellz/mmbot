const { Command } = require('klasa');
const { promisify } = require('util');
const { filterVideos, playNextSong } = require('../../musicUtil.js');
const search = promisify(require('youtube-search'));
const ytdl = require('ytdl-core');
const searchOptions = { maxResults: 5, key: require('../../../config.json').youtubeApiKey };

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['q'],
            runIn: ['text'],
			description: 'View the queued songs',
		});
	}

	async run(msg) {
        const queue = this.client.musicQueues[msg.guild.id];
        if (queue.length < 1) return msg.channel.send(`There are currently no songs in the queue! Play a song with **${msg.guild.configs.prefix}play**.`);
        const queueMessage = [];
        queueMessage.push('__The songs currently queued are...__\n');
        let index = -1;
        queue.forEach(v => {
            index++;
            queueMessage.push(index == 0 ? `🎵 Currently playing **${queue[index].title}** by **${queue[index].channelTitle}** (<${queue[index].link}>)\n` : `**${index}.** **${queue[index].title}** by **${queue[index].channelTitle}** (<${queue[index].link}>)`)
        });
        return msg.channel.send(queueMessage.join('\n'));
	}

};
