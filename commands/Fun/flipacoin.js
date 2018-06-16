const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['coinflip', 'coin'],
			description: 'Flip a coin'
		});
	}

	async run(msg) {
		const initialResult = Math.random();
		if (initialResult > 0.07) {
			const result = Math.random();
			return msg.channel.send(result > 0.5 ? 'It\'s heads. https://media.giphy.com/media/6jqfXikz9yzhS/giphy.gif' : 'It\'s tails. http://lamcdn.net/hopesandfears.com/post-cover/2ysvBXMxJaAQzUVeSUBj7A-default.gif');
		} else {
			const result = Math.random();
			return msg.channel.send(result > 0.5 ? 'It rolled under the bed, sorry.' : 'It landed on its side. https://thumbs.gfycat.com/ImpartialEnormousCero-size_restricted.gif');
		}
	}

};
