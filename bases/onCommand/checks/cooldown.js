const main = require('../../../index');
const cooldown = require('../../../modules/cooldown');

module.exports = (obj, msg, command, args) => {
    if (obj.data){
        if (!main.config.bot.owners.includes(msg.author.id)){
            if (!cooldown.canUse(msg.author.id, command)){
                // if need wait cooldown
                let time_remaining = cooldown.textualLeft(msg.author.id, command);
                msg.channel.send(main.lang.get('errors.cooldown_left', command, time_remaining));
                console.log(main.lang.get("bot.command_check_failed.cooldown_not_reached", time_remaining));
                return false;
            }
        }
    }
}

