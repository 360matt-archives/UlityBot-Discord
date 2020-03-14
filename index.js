const Discord = require('discord.js');
const colors = require('colors');
const fs = require('fs');

colors.setTheme({});

module.exports.client = new Discord.Client();
module.exports.config = require('./config/config.json');
module.exports.lang = new (require(`./lib/lang`))(this.config.default.lang);
module.exports.db = require('./lib/db');

/* require('./web_server/main'); // perte de motivation */

fs.readdir(`${__dirname}/bases`, (err, files) => {
    files.forEach(file => {
        let x = require(`${__dirname}/bases/${file}`);
        if (typeof x.run !== 'undefined')
            x.run();
    })

    this.client.login(this.config.bot.token)
    .catch((e) => {
        if (e.code === "TOKEN_INVALID")
            console.error(this.lang.get('bot.token_invalid'));
        else
            console.error(e)
    })
});




