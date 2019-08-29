exports.isBuyed = (msg, id, command) => {
    if (typeof msg.aliases[command] !== `undefined`) command = msg.aliases[command]

    if (msg.db.exist(`member.${id}.purchased.${command}`)){
        if (msg.db.get(`member.${id}.purchased.${command}`)){
            return true
        }
    }

    return false
}