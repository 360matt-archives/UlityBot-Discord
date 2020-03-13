const main = require('../index');

main.client.on('ready', () => {
    console.log(main.lang.get('bot.ready', main.client.users.cache.size-1, main.client.guilds.cache.size));
})