const ms = require(`ms`)

exports.command = (msg) => {
    if (!isNaN(msg.handler.cooldown)) msg.db.put(`member.${msg.member.id}.cooldown.${msg.command}`, Math.round(Number((new Date).getTime()) + Number(msg.handler.cooldown)))
}

exports.set = (msg) => {
    msg.db.put(`member.${msg.member.id}.cooldown.global`, Math.round(Number((new Date).getTime()/1000) + Number(2)))
}

exports.verify = (msg) => {
    if (Math.round((new Date).getTime()/1000) < Number(msg.db.get(`member.${msg.author.id}.cooldown.global`))){
        msg.no(`cooldown.global`, msg.time(2))
        return false
    }
    if (Math.round((new Date).getTime()/1000) < Number(msg.db.get(`member.${msg.author.id}.cooldown.${msg.command}`))){
        msg.no(`cooldown.command`, msg.time(Number(msg.db.get(`member.${msg.author.id}.cooldown.${msg.command}`))) - Math.round((new Date).getTime()/1000))
        return false
    }
    return true
}