const main = require('../index');
const time = require('../lib/time');
let cooldown = new main.db("cooldown").db;
let commandManager = require('../bases/onCommand')

module.exports.canUse = (id, cmd) => {
    let obj = commandManager.getCommand(cmd)
    

    if (obj)
        if (obj.data)
            if (obj.data.cooldown){
                console.log('aaa')
                if (cooldown.get(`${id}.${cmd}`).value() > new Date().getTime())
                return false;
            }

    return true
}

module.exports.secondsLeft = (id, cmd) => {
    let obj = commandManager.getCommand(cmd)

    if (!obj)
        return 0
    else if (!obj.data)
        return 0
    else if (!obj.data.cooldown)
        return 0

    let timeLeft = cooldown.get(`${id}.${cmd}`).value();
    let now = new Date().getTime();

    if (timeLeft > now)
        return timeLeft - now;
    else
        return 0
}

module.exports.textualLeft = (id, cmd) => time.textual(this.secondsLeft(id, cmd))

module.exports.applique = (id, cmd) => {
    let obj = commandManager.getCommand(cmd)

    if (obj)
        if (obj.data)
            if (obj.data.cooldown){
                cooldown.set(`${id}.${cmd}`, new Date().getTime() + (obj.data.cooldown*1000)).write();
                return true;
            }
    return false;
}