exports.command = (msg) => {
    if(msg.config.owners.includes(msg.author.id)) return true
    if (typeof msg.handler.data.cooldown !== `undefined`){
        if (!isNaN(msg.handler.data.cooldown)) {
            var _NextDate = Math.round(Number(new Date)/1000) + Number(msg.handler.data.cooldown)
            msg.db.put(`member.${msg.member.id}.cooldown.${msg.command}`, _NextDate)
        }
        else{

        }
    }

}

exports.set = (msg) => {
    if(msg.config.owners.includes(msg.author.id)) return true
    msg.db.put(`member.${msg.member.id}.cooldown.global`, Math.round(Number((new Date).getTime()/1000) + Number(msg.config.core.cooldown)))
}

exports.verify = (msg) => {
    if(msg.config.owners.includes(msg.author.id)) return true

    if (Math.round((new Date).getTime()/1000) < Number(msg.db.get(`member.${msg.author.id}.cooldown.global`))){
        msg.no({
            code: `cooldown.global`, 
            args: [
                msg.time({
                    type: "s",
                    time: Number(msg.db.get(`member.${msg.author.id}.cooldown.global`))
                })
            ]
        })
        return false
    }
    if (Math.round((new Date).getTime()/1000) < Number(msg.db.get(`member.${msg.author.id}.cooldown.${msg.command}`))){
        msg.no({
            code: `cooldown.command`, 
            args: [
                msg.time({
                    type: "s",
                    time: Number(msg.db.get(`member.${msg.author.id}.cooldown.${msg.command}`))
                })
            ]
        })

        return false
    }
    return true
}