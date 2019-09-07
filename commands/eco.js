exports.data = {
    permission: `allow`,
    aliases: ["money"],
    dm: true
}

exports.run = async (msg) => {
    msg.info({
        code: `eco.balance`,
        args: [
            msg.eco.get(msg.author.id)
        ]
    })
}