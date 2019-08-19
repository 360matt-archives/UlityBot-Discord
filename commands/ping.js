const Discord = require("discord.js")

exports.data = {
    permission: `allow`,
    aliases: ["latence"]
}

exports.run = async (msg) => {
    _oldTime = new Date
    n = await msg.info({code: `ping.loading`})
    msg.info({
        code: `ping.show`,
        args: [
            new Date - _oldTime - await msg.client.ws.ping, 
            await msg.client.ws.ping
        ],
        edit: n
    })
}