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
        return m.edit('🐱 ' + (await res.json()).fact);
    }

};
