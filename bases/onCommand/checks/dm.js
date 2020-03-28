const main = require('../../../index');

module.exports = (obj, msg, command, args) => {
    if (obj.data){
        if (msg.channel.type === 'dm' && !obj.data.dm){
            // dm insupporté
            msg.channel.send(main.lang.get('errors.dm_insupported', command));
            console.log(main.lang.get("bot.command_check_failed.dm_insupported"));
            return false;
        }
    }
}