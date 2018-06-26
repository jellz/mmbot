const ytdl = require('ytdl-core');

exports.filterVideos = async (results) => {
    const filtered = [];
    await results.forEach(r => {
        if (r.kind == 'youtube#video') {
            filtered.push(r);
        }
    });
    return filtered;
}

exports.playNextSong = async (client, guild, voiceChannel, textChannel) => {
    const nextSong = client.musicQueues[guild.id][0];
    if (!guild.voiceConnection) {
        const connection = await voiceChannel.join();
    }
    const connection = guild.voiceConnection;
    const dispatcher = await connection.play(ytdl(nextSong.link), { volume: false });
    textChannel.send(`🎵 Now playing **${nextSong.title}** by **${nextSong.channelTitle}**! (<${nextSong.link}>)`);

    // dispatcher events...
    dispatcher.once('finish', () => { // called when the current song ends or the bot leaves the vc
        if (!guild.voiceConnection) return;
        if (voiceChannel.members.size < 2) return;
        client.musicQueues[guild.id].shift();
        if (client.musicQueues[guild.id].length >= 1) {
            exports.playNextSong(client, guild, voiceChannel, textChannel);
        } else {
            textChannel.send('😭 The queue has no more songs left, so I left the voice channel.');
            connection.disconnect();
        }
    });
    
    setInterval(() => {
        if (!guild.voiceConnection) return;
        if (voiceChannel.members.size >= 2) return;
        voiceChannel.leave();
        client.musicQueues[guild.id] = [];
        textChannel.send('😴 All members have left the voice channel, so I left too.');
    }, 60000 * 2);
}