const fs = require("fs")
const Discord = require("discord.js")

exports.execute = (msg) => {
    msg.prefix = msg.var(`prefix`)
    msg.args = msg.content.slice(msg.prefix).trim().split(/ +/g);
    _command = msg.args.shift().toLowerCase()
    msg.command = _command.replace(msg.prefix, '');

    console.log()

    if (fs.existsSync(`${__dirname}/../commands/${msg.command}.js`) && _command.startsWith(_command)) {
            i = 2
            while (typeof i !== `undefined`){
                msg.handler = require(`${__dirname}/../commands/${msg.command}.js`)
                msg.cooldown = {}, msg.eco = {}
                msg.cooldown.set = require(`${__dirname}/../includes/cooldown.js`).set.bind(null, msg)
                msg.cooldown.verify = require(`${__dirname}/../includes/cooldown.js`).verify.bind(null, msg)
                msg.cooldown.command = require(`${__dirname}/../includes/cooldown.js`).command.bind(null, msg)
                msg.no = require(`${__dirname}/../includes/post.js`).post.bind(null, msg, `rouge`)
                msg.yes = require(`${__dirname}/../includes/post.js`).post.bind(null, msg, `vert`)
                msg.info = require(`${__dirname}/../includes/post.js`).post.bind(null, msg, `jaune`)
                msg.help = require(`${__dirname}/../includes/post.js`).post.bind(null, msg, `violet`)
                msg.lang = require(`${__dirname}/../langs/${msg.var(`lang`)}.js`).get.bind(null, msg)
                msg.emojis = require(`${__dirname}/../includes/emojis.js`).get.bind(null, msg)
                msg.time = require(`${__dirname}/../includes/time.js`).time.bind(null, msg)
                msg.eco.give = require(`${__dirname}/../includes/eco.js`).give.bind(null, msg)
                msg.eco.take = require(`${__dirname}/../includes/eco.js`).take.bind(null, msg)
                msg.eco.set = require(`${__dirname}/../includes/eco.js`).set.bind(null, msg)
                msg.eco.reset = require(`${__dirname}/../includes/eco.js`).reset.bind(null, msg)

                i--
                if (i == 0) delete i
            }

            msg.cooldown.verify()
            
            if (msg.permission({
                error: true
            })){
                msg.handler.run(msg);
                msg.cooldown.set()
                console.log(`>> ${msg.command} execute par ${msg.author.tag} (${msg.author.id})`)

            }
            if (msg.var(`deleteCommand`)) if (msg.guild.channels.has(msg.channel.id)) if (msg.channel.messages.has(msg.id)) msg.delete()
        }
}