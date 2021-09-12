const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client, token } = require('../Config/config');
const { readdirSync } = require('fs');

const commands = [];
const commandFiles = readdirSync('./src/Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../Commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(client.id),
			{ body: commands },
		);

		console.log('[SLASH] Comandos postados com sucesso.'.green);
	}
	catch (error) {
		console.error(error);
	}
})();
