module.exports = class GuildCreate {
	constructor () {
		return {
			nome: 'guildCreate',
			run: this.run
		};
	}

	async run (guild) {
		const system = require('../Config/system');
		const ch = await global.zuly.getRESTChannel('880863493472022539');

		ch.edit({
			name: `π§­ β Servers [${global.zuly.guilds.size}]`
		});

		const moment = require('moment');
		const owner = await global.zuly.getRESTUser(guild.ownerID);

		if (guild.region !== 'brazil') {
			await global.db.set(`idioma-${guild.id}`, 'en-us');
		}

		await global.zuly.executeWebhook(system.guild.id, system.guild.token, {
			avatarURL: global.zuly.user.avatarURL,
			username: global.zuly.user.username,
			embeds: [{
				color: 14498544,
				title: `<:zu_info:880812942713573396> GuildCreate | ${global.zuly.user.username}`,
				description: 'π Fui adicionada em um servidor, yeah!',
				fields: [
					{
						name: `π GuildInfo | ${guild.name}`,
						value: `π§­ **ID:** \`${guild.id} [${guild.shard.id}]\`\nπ **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\nπ **Members:** \`${guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('π DD/MM/YY')} | ${moment(guild.createdAt).format('β° HH:mm:ss')}\`\nπΊοΈ **Region:** \`${guild.region}\``
					}
				]
			}]
		});
	}
};
