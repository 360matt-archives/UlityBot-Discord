const main = require('../../../index');

module.exports = (obj, msg, command, args) => {
    let logger = main.lang.get.bind(this, "bot.command_executed", msg.author.tag, msg.author.id, msg.command);
    console.log((msg.channel.type === 'dm') ? logger() : logger(msg.guild.name, msg.guild.id))
    return true;
}