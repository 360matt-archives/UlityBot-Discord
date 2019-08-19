const Discord = require("discord.js")

exports.data = {
    permission: `allow`,
    aliases: ["money"]
}

exports.run = async (msg) => {
    mny = msg.eco.get(msg.author.id)
    msg.info({
        code: `eco.balance`,
        args: [
            mny
        ]
    })
}