const Discord = require("discord.js");
const client = new Discord.Client();
const config = require(`${__dirname}/data/config.json`);

client.login(config.bot.token);
delete config.bot.token


client.on('ready', async () => {
    try{
        const baseReady = require(`${__dirname}/base/baseReady.js`);

        i = 2
        while (typeof i !== `undefined`){
            client.config = config
            client.db = require(`${__dirname}/includes/db.js`)
            client.var = require(`${__dirname}/includes/checkVariables.js`).get.bind(null, client)

            i--;
            if (i == 0) delete i;
        }

        baseReady.execute(client)

        pistache = require(`${__dirname}/includes/pistache.js`)
        /* test */
        console.log(pistache.cache(`https://media.gettyimages.com/videos/aerial-shot-looking-down-at-sailboat-and-beautiful-clear-blue-ocean-video-id564792255?s=640x640`)
        .then(r => console.log(r)))


    }
    catch(err){
        console.error(err)
    }
});


client.on('message', msg => {
	try{
        const baseCommand = require(`${__dirname}/base/baseCommand.js`);

        if (msg.author.bot) return true;
            i = 2
            while (typeof i !== `undefined`){
                msg.config = config
                msg.db = require(`${__dirname}/includes/db.js`)
                msg.permission = require(`${__dirname}/includes/permission.js`).check.bind(null, msg)
                msg.var = require(`${__dirname}/includes/checkVariables.js`).get.bind(null, msg)

                i--;
                if (i == 0) delete i;
            }

            baseCommand.execute(msg)
    }
    catch(err){
        console.error(err)
    }
});