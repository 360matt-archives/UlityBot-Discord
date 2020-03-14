const main = require('../index');
const time = require('../lib/time');
let cooldown = new main.db("cooldown").db;

module.exports.canUse = (id, cmd) => {
    if (typeof main.commands[cmd]["cooldown"] !== 'undefined'){
        // console.log(cooldown.get(`${id}.${cmd}`).value())
        if (cooldown.get(`${id}.${cmd}`).value() > new Date().getTime())
            return false;
    }

    return true
}

module.exports.secondsLeft = (id, cmd) => {
    if (typeof main.commands[cmd]["cooldown"] !== 'undefined'){
        let timeLeft = cooldown.get(`${id}.${cmd}`).value();
        let now = new Date().getTime();

        if (timeLeft > now)
            return timeLeft - now;
    }
    
    return 0
}

module.exports.textualLeft = (id, cmd) => {
    return time.textual(this.secondsLeft(id, cmd));
}

module.exports.applique = (id, cmd) => {
    if (typeof main.commands[cmd]["cooldown"] !== 'undefined'){
        let waiting = main.commands[cmd]["cooldown"];
        cooldown.set(`${id}.${cmd}`, new Date().getTime() + (waiting*1000)).write();
    }
}