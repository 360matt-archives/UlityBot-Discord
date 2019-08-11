const Discord = require("discord.js");

exports.post = async (msg, color, data = {}) => {

    if (msg.var(`embed`) && typeof data.single === `undefined` || typeof data.title !== `undefined` && typeof data.description !== `undefined`){
        var content = new Discord.MessageEmbed()

        if (typeof data.color !== `undefined`){
            content.setColor(msg.color(data.color))
        }
        else{
            content.setColor(msg.color(color))
        }

        if (typeof data.footer !== `undefined`){
            switch(data.footer){
                case true:
                    content.setFooter(msg.config.footer)
                case false:
                    break
                default:
                    content.setFooter(data.footer)
            }
        }

        if (typeof data.author !== `undefined`){
            switch(typeof data.author.id !== `undefined`){
                case true:
                    content.setAuthor(data.author)
                case false:
                    content.setAuthor(msg.client.users.get(data.author))
            }
        }

        if (typeof data.title !== `undefined` || typeof data.title !== `undefined`){
            content.setTitle(data.title)
            content.setDescription(data.description)
        }

    }
    
    if (typeof data.code !== `undefined`){
        if (typeof data.args === `undefined`){ data.args = [] }
        if (typeof data.embed === `undefined`){ data.embed = `unknow` }

        if (msg.var(`embed`) && data.embed !== false){
            content.setTitle(msg.lang(`${data.code}.title`, data.args))
            content.setDescription(msg.lang(`${data.code}.description`, data.args))
        }
        else{
            content = msg.lang(`${data.code}.single`, args)
        }
    }

    if (typeof data.edit !== `undefined`){
        switch(typeof data.edit.id !== `undefined`){
            case true:
                return await data.edit.edit(content)
            case false:
                msg.client.channels.forEach(async _ch => {
                    if (_ch.messages.some(_m => _m.id === data.edit)){
                        return await _ch.messages.get(data.edit).edit(content)
                    }
                });
        }
        console.error(`Le message spécifié n'existe pas et ne peux donc pas être édité`); return false;
    }

    if (typeof data.channel !== `undefined`){
        switch (typeof data.channel.id !== `undefined`){
            case true:
                return await data.channel.send(content)
            case false:
                if (clients.channels.some(_ch => _ch.id === data.channel)){
                    return await client.channels.get(data.channel).send(content)
                }
        }
        console.error(`Le salon textuel spécifié n'existe pas et ne peux donc pas accueillir de message`); return false;
    }
    
    return await msg.channel.send(content)
    
}