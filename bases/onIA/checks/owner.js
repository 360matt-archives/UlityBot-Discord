const main = require('../../../index');

module.exports = (obj, msg, script) => {
    if (obj.data){
        if (obj.data.owner){
            if (!main.config.bot.owners.includes(msg.author.id)){
                if (!obj.data.silent){
                    let exp_message_ia = main.lang.get("format.message_ia");
                    msg.channel.send(main.lang.get("errors.ownership_only", exp_message_ia))
                }
                return false;
            }
        }
    }
}