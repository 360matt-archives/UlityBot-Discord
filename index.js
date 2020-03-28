const Discord = require('discord.js');
const colors = require('colors');
const fs = require('fs');

colors.setTheme({});

module.exports.client = new Discord.Client();
module.exports.config = require('./config/config.json');
module.exports.lang = new (require(`./lib/lang`))(this.config.default.lang);
module.exports.db = require('./lib/db');

fs.readdir(`${__dirname}/bases`, (err, files) => {
    try{
        files.forEach(file => {
            if (fs.lstatSync(`${__dirname}/bases/${file}`).isFile()){
                let x = require(`${__dirname}/bases/${file}`);
                if (typeof x.run !== 'undefined')
                    x.run();
            }
        })

        this.client.login(this.config.bot.token)
        .catch((e) => {
            console.error((e.code === "TOKEN_INVALID") ? this.lang.get('bot.token_invalid') : e)
        })
    }
    catch(e){
        console.error(e)
    }
});


