const cooldown = require('../../../modules/cooldown');

module.exports = (obj, msg, command, args, status) => {
    if (status !== false)
        cooldown.applique(msg.author.id, command)
}