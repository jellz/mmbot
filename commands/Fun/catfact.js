const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get a random cat fact',
		});
	}

	async run(msg) {
        const m = await msg.channel.send('🐱 Getting random cat fact...');
        const res = await fetch('https://catfact.ninja/fact');
        const body = await res.json();
        if (!res.ok) return m.edit('Something went wrong while querying the API. If this issue persists, please join the support server (%help) and report the bug.');
        return m.edit('🐱 ' + body.fact);
    }

};
