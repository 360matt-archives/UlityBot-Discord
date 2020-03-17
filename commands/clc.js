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
            let number = Number(args[0]) + 1;

            if (number >= 1 && number <= 99){
                msg.channel.bulkDelete(number).then(() => {
                    msg.channel.send(main.lang.get("commands.clc.deleted", number-1))
                    .then(msg2 => {
                        setTimeout(() => {
                            msg2.delete()
                        }, 3000)
                        
                    });
                });
            }
            else{
                msg.channel.send(main.lang.get("commands.clc.range", number, 1, 99));
                return false;
            }
        }
    }
}