const { Database } = require('quickmongo');
const { mongodb } = require('../Config/config');

try {
	global.db = new Database(mongodb);
	console.log('[ZULY] Database conectada!'.yellow);
}
catch (e) {
	console.log('[ZULY] Database não foi conectada por erro!'.red);
}