const Discord = require("discord.js");

exports.post = async (msg, color, code, ...args) => {
    if (typeof args[args.length - 1] === 'object'){
        options = args[args.length - 1];
        delete args[args.length - 1]
    }
    else{
        options = {}
    }

    if (msg.var(`embed`)){
        switch(color){
            case `rouge`: color = `#FF0000`; break
            case `vert`: color = `#00FF00`; break
            case `jaune`: color = `#FFCE42`; break
            case `violet`: color = `#8A2BE2`; break
        }

        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle(msg.lang(`${code}.title`, args))
        .setDescription(msg.lang(`${code}.description`, args))
        .setColor("0xFF0000");
    }
    else{
        content = msg.lang(`${code}.single`, args)
    }

    if (msg.var(`private`)){
        if (typeof options.message !== `undefined`){
            switch (options.action){
                default:
                    msg.client.channels.get(options.message.channel.id).messages.get(options.message.id).edit(content)
                    return options.message
            }
        }

        let newmsg = await msg.author.send(content)
        return newmsg
    }
    else{
        if (typeof options.message !== `undefined`){
            switch (options.action){
                default:
                    msg.client.channels.get(options.message.channel.id).messages.get(options.message.id).edit(content)
                    return options.message
            }
        }

        let newmsg = await msg.channel.send(content)
        return newmsg
    }
}