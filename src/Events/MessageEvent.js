module.exports = {
	name: 'messageCreate',
	once: false,
	async execute (message) {
		if (message.author.bot) return;
		const { prefix } = require('../Config/config');
		const regexPrefix = new RegExp(`^(${prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi');
		if (message.content.match(regexPrefix)) return message.channel.send(`😦 ${message.author} **|** Por motivos de compatibilidade, fui totalmente passada para **<:zu_slash:886288977668243566> slash-commands**, caso os comandos não apareçam, me adicione novamente pelo link: https://discord.com/oauth2/authorize?scope=bot%20applications.commands&client_id=${global.zuly.user.id}&permissions=805432446`);
	},
};