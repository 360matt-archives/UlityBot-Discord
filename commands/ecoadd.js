const Discord = require("discord.js")

exports.data = {
    permission: `allow`
}

exports.run = async (msg) => {
    id = msg.args[0]
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