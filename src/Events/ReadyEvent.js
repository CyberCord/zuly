module.exports = {
	name: 'ready',
	once: true,
	execute (client) {
		console.log(`[ZULY] Ligado em ${client.user.username}.`.green);
		setInterval(() => {
			console.log(`[RAM] ${process.memoryUsage().rss / 1024 / 1024}mb`.cyan);
		}, 5000);
	},
};