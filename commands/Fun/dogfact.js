const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get a random dog fact',
		});
	}

	async run(msg) {
        const m = await msg.channel.send('🐶 Getting random dog fact...');
        const res = await fetch('https://dog-api.kinduff.com/api/facts');
        const body = await res.json();
        if (!res.ok || !body.success) return m.edit('Something went wrong while querying the API. If this issue persists, please join the support server (%help) and report the bug.');
        return m.edit('🐶 ' + body.facts[0]);
    }

};
