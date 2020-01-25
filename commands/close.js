module.exports.data = {
    // empty
}

module.exports.run = (msg, client, args) => {

    if (msg.channel.id == msg.ticket.getID())
        msg.ticket.delete()
    
    // simplement

}