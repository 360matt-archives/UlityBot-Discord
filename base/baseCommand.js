const fs = require("fs")
const Discord = require("discord.js")

exports.execute = (msg) => {
    msg.prefix = msg.var(`prefix`)
    msg.args = msg.content.slice(msg.prefix).trim().split(/ +/g);
    _command = msg.args.shift().toLowerCase()
    msg.command = _command.replace(msg.prefix, '');
    var NoExec = false;

    if (typeof msg.aliases[msg.command] !== `undefined`) msg.command = msg.aliases[msg.command].replace(msg.prefix, '')


    if (fs.existsSync(`${__dirname}/../commands/${msg.command}.js`) && _command.startsWith(msg.prefix)) {
            i = 2
            for (var i = 0; i < 2; i++) {
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
                msg.eco.get = require(`${__dirname}/../includes/eco.js`).get.bind(null, msg)
                msg.color = require(`${__dirname}/../includes/color.js`).color.bind(null, msg)
                msg.texte = require(`${__dirname}/../includes/texte.js`).texte.bind(null, msg)
                msg.ts = require(`${__dirname}/../includes/ts.js`).ts
                msg.ifArg = require(`${__dirname}/../includes/ifArg.js`).ifArg.bind(null, msg)
                msg.ifArg.err = require(`${__dirname}/../includes/ifArg.js`).ifArg.err.bind(null, msg)
                msg.resolve = require(`${__dirname}/../includes/resolve.js`).resolve.bind(null, msg)
                msg.toid = require(`${__dirname}/../includes/toid.js`).toid.bind(null, msg)
                msg.premium = require(`${__dirname}/../includes/premium.js`).premium.bind(null, msg)
                msg.premium.isPremium = require(`${__dirname}/../includes/premium.js`).isPremium.bind(null, msg)
                msg.premium.isEnabled = require(`${__dirname}/../includes/premium.js`).isEnabled.bind(null, msg)
                msg.premium.errNotPremium = require(`${__dirname}/../includes/premium.js`).errNotPremium.bind(null, msg)
                msg.buy = require(`${__dirname}/../includes/buy.js`).buy.bind(null, msg)
                msg.buy.isBuyed = require(`${__dirname}/../includes/buy.js`).isBuyed.bind(null, msg)
                msg.buy.isEnabled = require(`${__dirname}/../includes/buy.js`).isEnabled.bind(null, msg)
                msg.buy.getCost = require(`${__dirname}/../includes/buy.js`).getCost.bind(null, msg)
                msg.buy.errNotPurchassed = require(`${__dirname}/../includes/buy.js`).errNotPurchassed.bind(null, msg)
                msg.range = require(`${__dirname}/../includes/range.js`).range
                msg.range.err = require(`${__dirname}/../includes/range.js`).range.err.bind(null, msg)
                msg.check = require(`${__dirname}/../includes/check.js`).check.bind(null, msg)

            }

            if (!msg.cooldown.verify()){
                NoExec = true
            }


            if (msg.channel.type === `dm`){
                if (typeof msg.commandes[msg.command].dm == `undefined`){ NoExec = true }
                else{
                    if (msg.commandes[msg.command].dm !== true){ NoExec = true }
                }
            }
            else{
                if (!msg.permission({ error: true })){ NoExec = true }
            }

            if (msg.premium.isEnabled(msg.command)){
                if (!msg.premium.isPremium(msg.member.id)){
                    msg.premium.errNotPremium(msg.command)
                    NoExec = true
                }
            }
            else{
                if (msg.buy.isEnabled(msg.command)){
                    if (!msg.buy.isBuyed(msg.member.id, msg.command)){
                        msg.buy.errNotPurchassed(msg.command)
                        NoExec = true
                    }
                }
            }

            if (!NoExec){
                msg.handler.run(msg);
                msg.cooldown.set()
            }

            if (msg.channel.type !== `dm`) {
                console.log(`>> ${msg.command} execute par ${msg.author.tag} (${msg.author.id}) sur ${msg.guild.name} (${msg.guild.id}) ---> NoExec: ${NoExec}`)
                if (msg.var(`deleteCommand`)) if (msg.guild.channels.has(msg.channel.id)) if (msg.channel.messages.has(msg.id)) msg.delete()
            }
            else{
                console.log(`>> ${msg.command} execute par ${msg.author.tag} (${msg.author.id}) en #DM ---> NoExec: ${NoExec}`)
            }
        }
}