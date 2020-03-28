const main = require('../index');

module.exports.data = {
    permission: "MANAGE_MESSAGES"
}

module.exports.run = (msg, args) => {
    if (msg.argsman.exist()){
        if (!msg.argsman.isType(0, "number")){
            msg.channel.send(main.lang.get("commands.clc.syntax", "clc"));
            return false;
        }
        else{
            let n = Number(args[0])
            if (n >= 1 && n <= 99){
                msg.channel.bulkDelete(n+1).then(() => {
                    msg.channel.send(main.lang.get("commands.clc.deleted", n))
                    .then(msg2 => {
                        setTimeout(() => {
                            msg2.delete()
                        }, 3000)
                    });
                });
            }
            else{
                msg.channel.send(main.lang.get("commands.clc.range", n, 1, 99));
                return false;
            }
        }
    }
}