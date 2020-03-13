const main = require('../index');

module.exports.data = {
    permission: "MANAGE_MESSAGES",
    cooldown: 10
}


module.exports.run = (msg, args) => {

    if (msg.argsman.exist())
        msg.channel.send(msg.argsman.text());
    else
        msg.channel.send(main.lang.get("global.arg_text_required"))

}