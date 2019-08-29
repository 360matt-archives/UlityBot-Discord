exports.data = {
    permission: `allow`
}

exports.run = async (msg) => {
    if (msg.ifArg.err(1, "member")){
        if (msg.ifArg.err(2)){
            id = msg.toid(msg.args[0])
            count = msg.args[1]
            msg.eco.give(count, id)
            msg.yes({
                code: `eco.add`,
                args: [
                    count,
                    id,
                    msg.eco.get(id)
                ]
            })
        }
    }
}