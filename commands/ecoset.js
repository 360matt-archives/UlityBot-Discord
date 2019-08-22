const Discord = require("discord.js")

exports.data = {
    permission: `owner`
}

exports.run = async (msg) => {
    id = msg.args[0]
    count = msg.args[1]
    msg.eco.set(count, id)

    msg.yes({
        code: `eco.set`,
        args: [
            count,
            id
        ]
    })

}