const Discord = require("discord.js")

exports.data = {
    permission: `owner`
}

exports.run = async (msg) => {
    id = msg.args[0]
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