module.exports = async (client) => {
	const { readdirSync } = require('fs');
	const commandFiles = readdirSync('./src/Commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
	    const command = require(`./Commands/${file}`);
	    client.commands.set(command.data.name, command);
	}
};