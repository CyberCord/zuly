module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'ping',
				categoria: '📖 » Informação',
				desc: 'Veja a latência do bot'
			},
			en: {
				nome: 'ping',
				categoria: '📖 » Information',
				desc: 'See bot latency'
			},
			aliases: ['latency', 'ws', 'pong'],
			run: this.run
		};
	}

	async run (ctx) {
		const ping = await global.db.ping;
		return ctx.send(`🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.zuly.shards.random().latency}ms\`\n- **Database:** \`${ping}ms\``);
	}
};

// ADG, Davi e LRD
