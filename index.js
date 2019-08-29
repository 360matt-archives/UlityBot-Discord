const Discord = require("discord.js")
const client = new Discord.Client()
const config = require(`${__dirname}/data/config.json`)
const fs = require('fs');
const colors = require(`colors`)
var watch = require('node-watch');
aliases = []
commandes = []

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });

client.login(config.bot.token)
.catch(err => console.error(err))
//delete config.bot.token
/* delete client.token */

fs.readdir(`${__dirname}/commands`, (err, files) => {
    files.forEach(file => {
        x = require(`./commands/${file}`).data
        commandes[file.replace(`.js`, '')] = x

        if (typeof x.aliases !== `undefined`){
            x.aliases.forEach(aliase => {
                aliases[aliase] = file.replace(`.js`, '')
            })
        }
    });
});


try{
    watch(`${__dirname}`, { recursive: true }, function(evt, name) {
        try{
            if (name !== `${__dirname}/data/data.json` && typeof require.cache[name] !== `undefined`){
                delete require.cache[name]
                console.log(`Fichier rechargé`.cyan)
            }
        }
        catch(err){}
    });
}
catch(err){}


setInterval(async () => {
    delete require.cache
}, 180000)

client.on('ready', async () => {
    try{
        const baseReady = require(`${__dirname}/base/baseReady.js`);

        i = 2
        while (typeof i !== `undefined`){
            client.config = config
            client.db = require(`${__dirname}/includes/db.js`)
            client.var = require(`${__dirname}/includes/checkVariables.js`).var.bind(null, client)

            i--;
            if (i == 0) delete i;
        }

        baseReady.execute(client)
    }
    catch(err){
        console.error(err)
    }
});


client.on('message', msg => {
	try{
        const baseCommand = require(`${__dirname}/base/baseCommand.js`);

        if (msg.author.bot) return true;
            for (var i = 0; i < 2; i++) {
                msg.config = config
                msg.db = require(`${__dirname}/includes/db.js`)
                msg.permission = require(`${__dirname}/includes/permission.js`).check.bind(null, msg)
                msg.var = require(`${__dirname}/includes/checkVariables.js`).var.bind(null, msg)
                msg.aliases = aliases
                msg.commandes = commandes

            }

            baseCommand.execute(msg)
    }
    catch(err){
        console.error(err)
    }
});