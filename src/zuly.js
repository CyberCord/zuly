// Puxando as cores que iremos usar para fazer o console.log
require('colors');
// Puxando somente o que iremos usar do Eris.
const {
	Client,
	Collection
} = require('eris');
// Puxando o token do arquivo de configuração
const {
	token
} = require('./Config/config');
// Puxando o arquivo do discord-together, já que ela que faz os comandos do discord-together funcionar
const DiscordTogether = require('./Client/discord-together');
// Criando o client, que no caso é nosso bot.
const client = new Client(token, {
	allowedMentions: {
		everyone: false,
		roles: false,
		users: true
	},
	autoreconnect: true,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	// disableEvents: []
	// firstShardID: 0
	getAllUsers: false,
	// guildCreateTimeout: 2000
	// guildSubscriptions: true
	intents: [
		'guilds',
		'guildMembers',
		'guildMessages',
		'guildVoiceStates',
		'guildMessageReactions'
	],
	largeThreshold: 200,
	// lastShardID
	// latencyThreshold
	// maxReconnectAttempts: Infinity
	maxResumeAttempts: 20,
	maxShards: 'auto',
	messageLimit: 100,
	opusOnly: false,
	// ratelimiterOffset
	// reconnectDelay
	// requestTimeout: 15000
	rest: {
		// agent
		baseURL: '/api/v9',
		// decodeReasons
		// disableLatencyCompensation
		domain: 'canary.discord.com',
		latencyThreshold: 40000
		// ratelimiterOffset
		// requestTimeout
	},
	restMode: true
	// seedVoiceConnections
	// ws
});
// Iniciando o discord-together
client.discordTogether = new DiscordTogether(client);
// Criando as coleções de comandos/aliases
client.commands = new Collection();
client.aliases = new Collection();
// Puxando a iniciação do bot
const Zuly = require('./Client/zulybot.js');
const ZulyBot = new Zuly(client);
// Iniciando o bot
ZulyBot.iniciar().then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});
// Definindo o bot como variavel global, para que seja mais fácil de acessar.
global.zuly = client;
global.zuly.manager = ZulyBot;
// Puxando o carregador.
require('./ZulyUtilLoader');
