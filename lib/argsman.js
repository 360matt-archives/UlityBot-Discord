const main = require('../index');

module.exports = class {
    constructor (msg){
        this.msg = msg;
    }

    text = (min = 0) => {
        let count = min;
        let final = "";
    
        this.msg.args.forEach(x => {
            if (count != 0)
                count--;
            else
                final += x + " ";
        });

        return final.trim();
    }

    decode = (mention) => {
        if (mention.startsWith('<@'))
            return mention.match(/^<@!?(\d+)>$/)[1]
        else if (mention.startsWith('<#'))
            return mention.match(/^<#!?(\d+)>$/)[1]
        else if (mention.startsWith('<@&'))
            return mention.match(/^<@&!?(\d+)>$/)[1]
    }

    exist = (index = 0) => {
        return typeof this.msg.args[index] !== 'undefined'
    }

    isType = (arg, type) => {
        if (type == "number")
            return !isNaN(arg);
        else if (type == "channel")
            return main.client.channels.has(this.decode(arg));
        else if (type == "user")
            return main.client.users.has(this.decode(arg))
        else if (type == "member"){
            if (this.msg.channel.type == "text")
                return this.msg.guild.members.fetch(this.decode(arg))
        }
        else if (type == "role")
            return main.client.roles.has(this.decode(arg))
        else if (type == "guild")
            return main.client.guilds.has(arg)
        return false;
    }
}