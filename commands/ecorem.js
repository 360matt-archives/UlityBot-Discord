exports.data = {
    permission: `owner`
}

exports.run = async (msg) => {
    if (msg.ifArg.err(1, "member")){
        if (msg.ifArg.err(2)){
            id = msg.toid(msg.args[0])
            count = msg.args[1]
            msg.eco.take(count, id)
            msg.yes({
                code: `eco.rem`,
                args: [
                    count,
                    id,
                    msg.eco.get(id)
                ]
            })
        }
    }
}