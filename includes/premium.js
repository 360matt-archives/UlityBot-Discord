exports.isPremium = (msg, id) => {
    if (msg.db.exist(`member.${id}.premium`)){
        if (msg.db.get(`member.${id}.premium`)){
            return true
        }
    }

    return false
}

exports.premium = (msg, id) => {
    if (!msg.db.exist(`member.${id}.premium`)){
        msg.db.put(`member.${id}.premium`, true)
        return true
    }

    return false
}

exports.isEnabled = (msg, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]
    if (typeof msg.commandes[command] !== `undefined`){
        if (typeof msg.commandes[command].premium !== `undefined`){
            if (msg.commandes[command].premium === true) return true 
        }
    }
    return false
}

exports.errNotPremium = (msg, command) => {
    msg.no({
        code: `general.premium.no_premium`,
        args: [
            command
        ]
    })
}

