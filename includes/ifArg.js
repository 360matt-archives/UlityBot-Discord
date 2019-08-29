exports.ifArg = (msg, number = 1, verify = null) => {
    number--;

    if (typeof msg.args[number] !== `undefined`){
        if (verify !== null){
            if (msg.resolve(msg.args[number], verify) === false){
                return false
            }
        }
        return true
    }
    return false
}

exports.ifArg.err = (msg, number = 1, verify = null) => {
    number--;

    if (typeof msg.args[number] !== `undefined`){
        if (verify !== null){
            _resolve = msg.resolve(msg.args[number], verify)

            if (_resolve === false){
                switch(verify){
                    case `channel`: case `channels`: case `salon`: case `salons`:
                        type = msg.lang(`general.expressions.channel`)
                        break
                    case `user`: case `users`: case `member`: case `members`: case `membre`: case `membres`:
                        type = msg.lang(`general.expressions.member`)
                        break
                    case `guild`: case `guilds`: case `server`: case `servers`: case `serveur`: case `serveurs`:
                        type = msg.lang(`general.expressions.server`)
                    case `emojis`:
                        type = msg.lang(`general.expressions.emojis`)
                    default:
                        type = msg.lang(`general.expressions.unknown`)
                }

                msg.no({
                    code: "general.missing_arg.type",
                    args: [
                        number+1,
                        type
                    ]
                })
                return false
            }
        }
        return true
    }
    msg.no({
        code: "general.missing_arg.basic",
        args: [
            number+1
        ]
    })
    return false
}

