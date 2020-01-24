module.exports.data = {
    permission: ""
}


module.exports.run = async (msg, client, args) => {
    msg.channel.send("Truc")

    console.log(await msg.ticket.create())
}