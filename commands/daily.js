exports.data = {
    permission: `allow`,
    cooldown: 86400
}

exports.run = async (msg) => {
    daily = Math.floor(Math.random(8) * Math.floor(25))
    msg.yes({
        code: `eco.daily`,
        args: [
            daily
        ]
    })
    
    msg.eco.give(daily, msg.author.id)
    msg.cooldown.command()
}