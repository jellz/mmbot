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
        return m.edit('🐶 ' + (await res.json()).facts[0]);
    }

};
