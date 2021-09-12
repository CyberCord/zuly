const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('[⏰ Util] Show a user info!'),
	async execute (interaction) {
		await interaction.reply('Pong!');
	},
};
