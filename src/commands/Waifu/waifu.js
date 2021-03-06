/* eslint-disable new-cap */
module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'waifu',
				categoria: 'ð Â» Waifu',
				desc: 'Waifu aleatÃ³ria'
			},
			en: {
				nome: 'waifu',
				categoria: 'ð Â» Waifu',
				desc: 'Random waifu.'
			},
			aliases: ['wa', 'wai', 'w'],
			run: this.run
		};
	}

	async run (ctx) {
		const ReactionCollector = require('../../Helpers/ReactionCollector');
		// const waifudb = require('../../Database/WaifuDB')
		const { get } = require('axios');
		await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
			const res = response.data;
			const rand = Math.floor(Math.random() * res.length);
			const waifu = res[rand];

			waifu.id = rand;
			waifu.valor = Math.floor(Math.random() * 2000) + 18;

			const dono = await global.db.get(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id);
			const timeout = 7200000;

			const embed = new ctx.embed();
			embed.title(`â¡ï¸°ð [${waifu.name}] âËà¸ `);
			if (!dono) {
				embed.description(`>>> à¹âï¹ **Ryos:** ${waifu.valor}\nà¹âï¹ **Anime:** ${waifu.anime}`);
			}
			else {
				const owner = await global.zuly.getRESTUser(dono);
				embed.description(`>>> à¹âï¹ **Ryos:** ${waifu.valor}\nà¹âï¹ **Anime:** ${waifu.anime}\nà¹âï¹ **${ctx.idioma.waifu.dono}:** ${owner.username}#${owner.discriminator}`);
			}
			embed.color('#ffcbdb');
			embed.image(waifu.image);
			if (!dono) {
				embed.footer(ctx.idioma.waifu.casar, global.zuly.user.avatarURL);
			}
			ctx.message.channel.createMessage(embed.create).then(async message => {
				if (!dono) {
					const MarryCollector = new ReactionCollector(message, {
						user: ctx.message.author,
						ignoreBot: true,
						emoji: 'ð',
						time: 60000,
						max: 1,
						acceptReactionRemove: false,
						stopOnCollect: true
					});
					message.addReaction('ð');
					MarryCollector.on('collect', async () => {
						const date = Date.now();
						const marrytime = await global.db.get(`timeout-${ctx.message.author.id}`);

						if (marrytime !== null && timeout - (date - marrytime) > 0) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.waifu.casado}`);

						const ryos = await global.db.get(`ryos-${ctx.message.channel.guild}-${ctx.message.author.id}`);

						if (ryos) {
							global.db.set(`ryos-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, ryos + waifu.valor);
						}
						else {
							global.db.set(`ryos-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, waifu.valor);
						}

						global.db.set(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id);
						global.db.set(`timeout-${ctx.message.author.id}`, Date.now());

						const embed = new ctx.embed();
						embed.title(`â¡ï¸°ð [${waifu.name}] âËà¸ `);
						embed.description(`>>> à¹âï¹ **Ryos:** ${waifu.valor}\nà¹âï¹ **Anime:** ${waifu.anime}`);
						embed.color('#ffcbdb');
						embed.image(waifu.image);
						embed.footer(ctx.idioma.waifu.casou.replace('%w', waifu.name), waifu.image);
						message.edit(embed.create);
					});
				}
			});
		});
	}
};
