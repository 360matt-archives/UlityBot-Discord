const main = require('../../../index');

module.exports = (obj, msg, script) => {
    if (msg.channel.type == 'dm'){
        if (obj.data){
            if (!obj.data.dm){
                if (!obj.data.silent){
                    let exp_message_ia = main.lang.get("format.message_ia");
                    msg.channel.send(main.lang.get("errors.dm_insupported", exp_message_ia))
                }
                return false
            }
        }
    }
}