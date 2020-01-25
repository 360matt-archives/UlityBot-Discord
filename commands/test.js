module.exports.data = {
    permission: ""
}


module.exports.run = async (msg, client, args) => {
    msg.channel.send("Truc")

    let id = await msg.ticket.create()


    
}