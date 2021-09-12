module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute (interaction) {
		if (!interaction.isCommand()) return;
		const { WebhookClient, MessageEmbed } = require('discord.js');
		const system = require('../Config/system');

		console.log(interaction);

		const webhook = new WebhookClient({
			id: system.command.id,
			token: system.command.token
		});
		const command = global.zuly.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
			const embed = new MessageEmbed();
			embed.setTitle(`<:zu_slash:886681118470987967> Command-log | ${global.zuly.user.username}`);
			embed.addField('📋 Comando:', `\`\`\`/${interaction.commandName}\`\`\``);
			embed.setColor('BLUE');
			webhook.send({
				username: global.zuly.user.username,
				avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, size: 4096 }),
				embeds: [embed]
			});
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		}
	},
};