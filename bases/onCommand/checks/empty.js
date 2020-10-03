const main = require('../../../index');

module.exports = (obj, msg, command, args) => {
    if (obj == null){
            msg.channel.send(main.lang.get('global.unknown_command', command));
            return false;
        }

}
