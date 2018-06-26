const { Command, Stopwatch, Type, util } = require('klasa');
const { inspect } = require('util');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			guarded: true,
			description: 'Execute a terminal command',
			usage: '<command:str>'
		});
	}

	async run(message, [command]) {
        require('child_process').exec(command, (error, stdout, stderr) => {
            if (error) {
                msg.channel.send(error);
                return console.error(error);
            }
            msg.channel.send(stdout.slice(0, 1500), { code: 'js' });
        });
    }
};
