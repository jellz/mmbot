const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['8', 'magic', 'mirror'],
			description: 'Magic 8-Ball, does exactly what the toy does.',
			usage: '<query:str>'
		});
	}

	async run(msg, [query]) {
		return msg.channel.send(question.endsWith('?') ?
			`🎱 **${msg.author.username}**, ${answers[Math.floor(Math.random() * answers.length)]}` :
			`🎱 **${msg.author.username}**, that doesn't look like a question, try again please.`);
	}

};

const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];