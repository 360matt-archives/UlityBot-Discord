const main = require('../../../index');

module.exports = (obj, msg, command, args) => {
    if (obj.data){
        if (obj.data.owner){
            if (!main.config.bot.owners.includes(msg.author.id)){
                // no permission owner
                msg.channel.send(main.lang.get('errors.ownership_only', msg.command));
                console.log(main.lang.get("bot.command_check_failed.owner_only"));
                return false;
            }
        }
    }
}