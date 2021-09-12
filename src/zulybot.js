// PUXANDO DEPENDENCIAS
require('colors');
const { Client, Intents, Collection, Options } = require('discord.js');
const { token } = require('./Config/config');
// CLIENTE
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	],
	partials: [
		'USER',
		'CHANNEL',
		'MESSAGE',
		'REACTION',
		'GUILD_MEMBER',
	],
	restWsBridgeTimeout: 0,
	restTimeOffset: 100,
	makeCache: Options.cacheWithLimits({
		ApplicationCommandManager: 0,
		BaseGuildEmojiManager: 0,
		GuildChannelManager: 0,
		GuildBanManager: 0,
		GuildInviteManager: 0,
		GuildManager: Infinity,
		GuildMemberManager: 0,
		GuildStickerManager: 0,
		MessageManager: 0,
		PermissionOverwriteManager: 0,
		PresenceManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		RoleManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: 0,
		UserManager: 0,
		VoiceStateManager: 0
	})
});
// HANDLERS
client.commands = new Collection();
require('./Utils/deploy-commands');
require('./EventHandler.js')(client);
require('./CommandHandler.js')(client);
require('./Database/mongo');
global.zuly = client;
// INICIANDO TUDO
client.login(token);
