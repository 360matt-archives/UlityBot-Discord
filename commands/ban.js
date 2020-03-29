let main = require('../index');

module.exports.data = {
    permission: "BAN_MEMBERS"
}

module.exports.run = (msg, args) => {
    if (msg.argsman.exist()){
        if (msg.argsman.isType(args[0], "member")){
            let member = msg.guild.members.resolve(msg.argsman.decode(args[0]));

            if (member.id == msg.author.id){
                msg.channel.send(main.lang.get("commands.ban.ban_yourself", member.id))
                return false;
            }
            else if (main.config.bot.owners.includes(member.id)){
                let response = main.lang.get.bind(this, "commands.ban.cant_ban_bot_owner", member.id)
                msg.channel.send((main.config.bot.owners.includes(msg.author.id)) ? response() : response(msg.author.id))
                return false;
            }
            else if (member.id == main.client.user.id){
                msg.channel.send(main.lang.get("commands.ban.ban_bot_itself", member.id))
                return false;
            }
            else if (member.bannable){
                member.ban().then((x, y) => {
                    if (!y){
                        msg.channel.send(main.lang.get("emojis.party"))
                        let response = "commands.ban." + (msg.argsman.exist(1) ? "banned_server_with_reason" : "banned_server")
                        msg.channel.send(main.lang.get(response, member.id, msg.author.id, msg.argsman.text(1)))
                    }
                    else{
                        msg.channel.send(main.lang.get("emojis.rage"));
                        msg.channel.send(main.lang.get("commands.ban.cant_ban", member.user.tag));
                    }
                })
                return false;
            }
            else{
                msg.channel.send(main.lang.get("emojis.rage"));
                msg.channel.send(main.lang.get("commands.ban.cant_ban", member.user.tag));
                return false;
            }
        }
    }

    msg.channel.send(main.lang.get("commands.ban.syntax", msg.command));
}