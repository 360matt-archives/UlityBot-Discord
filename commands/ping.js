const Discord = require("discord.js")

exports.permission = `allow`

exports.run = async (msg) => {
    _oldTime = new Date
    n = await msg.info(`ping.loading`)
    _newTime = Number(new Date) - Number(_oldTime)
    let ping = msg.client.ws.ping
    msg.info(`ping.show`, _newTime, ping, {"message": n, "action": "edit"})
}