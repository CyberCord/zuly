module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'userinfo',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja informações sobre um usuário'
			},
			en: {
				nome: 'userinfo',
				categoria: '🕰️ » Utility',
				desc: 'View information about a user'
			},
			aliases: ['whois', 'ui', 'member', 'memberinfo'],
			run: this.run
		};
	}

	async run (ctx) {
		const { Constants: { UserFlags } } = require('eris');
		const { token } = require('../../config');
		const f = require('node-fetch');

		const badgeEmojis = {
			DISCORD_EMPLOYEE: '<:zu_staff:885919349062402098>',
			DISCORD_PARTNER: '<:zu_partner:885196140042158170>',
			HYPESQUAD_EVENTS: '<:zu_hypesquad:885919442117222400>',
			BUG_HUNTER_LEVEL_1: '<:zu_bughunter_1:885918998426951721>',
			HOUSE_BRAVERY: '<:zu_bravery:885918769422151750>',
			HOUSE_BRILLIANCE: '<:zu_brilliance:885918816654213191>',
			HOUSE_BALANCE: '<:zu_balance:885918786878836827>',
			EARLY_SUPPORTER: '<:zu_supporter:885919070476705792>',
			BUG_HUNTER_LEVEL_2: '<:zu_bughunter_2:885919018349920306>',
			VERIFIED_BOT_DEVELOPER: '<:zu_developer:885918499380293692>',
			VERIFIED_BOT: '<:zu_verifiedbot_1:885923881108504616><:zu_verifiedbot_2:885923960473153546>',
			BOT: '<:zu_bot:885923705316859955>',
		};
		function getUserBadges (user) {
			const badges = [];

			for (const flag in UserFlags) {
				if (user.publicFlags & UserFlags[flag]) {
					badges.push(badgeEmojis[flag]);
				}
			}

			return badges;
		}

		async function banner (id) {

			if(!id) new Error('Não foi fornecido o ID do usuário');
			const request = await f(`https://discord.com/api/v9/users/${id}`, {
				headers: {
	  Authorization: `Bot ${token}`
				}
			});

			const data = await request.json();
			let user = data.id;

			if(data.message == 'Unknown User') new Error('Usuário desconhecido.');
			if(!data.banner) return null;

			let banner = data.banner;
			let format = {};


			if(banner.startsWith('a_')) {
				format = '.gif';
			}
			else {
				format = '.png';
			}

			let size = 512;
			let url = `https://cdn.discordapp.com/banners/${user}/${banner}${format}?size=${size}`;

			return url;

		};


		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]).catch(() => ctx.message.author) : ctx.message.author;
		const badges = getUserBadges(user);
		const embed = new ctx.embed();
		const userb = await banner(user.id);

		if (user.avatar.startsWith('a_')) {
			embed.title(`${user.username} <:zu_nitro:885919779205029898> ${badges.join(' ')}`);
		}
		else {
			embed.title(`${user.username} <:zu_basic:885925886837264384> ${badges.join(' ')}`);
		}
		embed.field(`📘 ${ctx.idioma.userinfo.tag} __${user.username}__`, `\`${user.username}#${user.discriminator}\``);
		embed.field(`📚 ${ctx.idioma.userinfo.id} __${user.username}__`, `\`${user.id}\``);
		embed.field(`📆 ${ctx.idioma.userinfo.create}`, `<t:${Math.floor(user.createdAt / 1000)}>`);
		embed.color('#ffcbdb');
		embed.thumbnail(user.avatarURL || 'https://i.imgur.com/2dwGomm.png');
		embed.image(userb);

		ctx.send(embed.create);
	}
};
