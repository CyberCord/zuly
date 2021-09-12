module.exports = async (client) => {
	const { readdirSync } = require('fs');
	const eventFiles = readdirSync('./src/Events').filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
	    const event = require(`./Events/${file}`);
	    if (event.once) {
		    client.once(event.name, (...args) => event.execute(...args));
	    }
		else {
	    client.on(event.name, (...args) => event.execute(...args));
	    }
	}
};