exports.isBuyed = (msg, id, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]

    if (msg.db.exist(`member.${id}.cmd_purchased.${command}`)){
        if (msg.db.get(`member.${id}.cmd_purchased.${command}`)){ return true }
    }

    return false
}

exports.buy = (msg, id, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]

    if (msg.db.exist(`member.${id}.cmd_purchased.${command}`) !== true){
        msg.db.put(`member.${id}.cmd_purchased.${command}`, true)
        return true
    }

    return false
}

exports.isEnabled = (msg, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]
    if (typeof msg.commandes[command] !== `undefined`){
        if (typeof msg.commandes[command].buy !== `undefined`){
            if (typeof msg.commandes[command].buy.enabled !== `undefined`){
                if (msg.commandes[command].buy.enabled === true) return true 
            }
        }
    }
    return false
}

exports.getCost = (msg, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]
    if (typeof msg.commandes[command].buy !== `undefined`){
        if (typeof msg.commandes[command].buy.cost !== `undefined`){
            return msg.commandes[command].buy.cost
        }
    }
    return false
}

exports.errNotPurchassed = (msg, command) => {
    msg.no({
        code: `general.buy.no_buyed`,
        args: [
            command,
            msg.buy.getCost(command)
        ]
    })
}