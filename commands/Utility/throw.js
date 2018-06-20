const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: 'This command will throw an error'
		});
	}

	async run(msg) {
        throw new Error('Oh no there is an error :(');
	}

};
