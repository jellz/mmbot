const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get a random lenny face',
		});
	}

	async run(msg) {
		return msg.channel.send(faces[Math.floor(Math.random() * faces.length)]);
	}

};

// Thank you https://www.lennyfaces.net/ 
const faces = [
    '( ͡° ͜ʖ ͡°)',
    '(☭ ͜ʖ ☭)',
    '(ᴗ ͜ʖ ᴗ)',
    '( ° ͜ʖ °)',
    '(⟃ ͜ʖ ⟄)',
    '( ‾ ʖ̫ ‾)',
    '(͠≖ ͜ʖ͠≖)',
    '( ͡° ʖ̯ ͡°)',
    'ʕ ͡° ʖ̯ ͡°ʔ',
    '( ͡° ل͜ ͡°)',
    '( ͠° ͟ʖ ͡°)',
    '( ͠° ͟ʖ ͠°)',
    '( ͡~ ͜ʖ ͡°)',
    '( ͡o ͜ʖ ͡o)',
    '( ͡◉ ͜ʖ ͡◉)',
    '( ͡☉ ͜ʖ ͡☉)',
    '( ͡° ͜V ͡°)',
    'ʕ ͡° ͜ʖ ͡°ʔ',
    '( ͡ᵔ ͜ʖ ͡ᵔ )',
    '( ͡° ͜ʖ ͡ °)'
];