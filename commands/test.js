module.exports.data = {
    permission: ""
}


module.exports.run = (msg, client, args) => {
    msg.channel.send("Truc")

    msg.ticket.create()
}