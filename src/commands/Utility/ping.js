const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: 'Ping, pong'
		});
	}

	async run(msg) {
        const m = await msg.channel.send('🏓 Ping?');
		m.edit(`🏓 Pong! (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~this.client.ping}ms)`);
	}

};
