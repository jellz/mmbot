const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			guarded: true,
			description: 'Unload a piece from mmbot',
			usage: '<Piece:piece>'
		});
	}

	async run(message, [piece]) {
		piece.unload();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (this.shard.id !== ${this.client.shard.id}) this.${piece.store}.get('${piece.name}').unload();
			`);
		}
		return message.sendMessage(message.language.get('COMMAND_UNLOAD', piece.type, piece.name));
	}

};
