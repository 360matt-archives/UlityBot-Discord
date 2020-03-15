const main = require('../index');

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
                if (main.config.bot.owners.includes(msg.author.id))
                    msg.channel.send(main.lang.get("commands.ban.cant_ban_colleague", member.id, msg.author.id))
                else
                    msg.channel.send(main.lang.get("commands.ban.cant_ban_bot_owner", member.id))
                
                return false;
            }
            else if (member.bannable){

                member.ban().then((x, y) => {
                    if (!y){
                        msg.channel.send(main.lang.get("emojis.party"))

                        if (msg.argsman.exist(1))
                            msg.channel.send(main.lang.get("commands.ban.banned_server_with_reason", member.id, msg.author.id, msg.argsman.text(1)));
                        else
                            msg.channel.send(main.lang.get("commands.ban.banned_server", member.id, msg.author.id));
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