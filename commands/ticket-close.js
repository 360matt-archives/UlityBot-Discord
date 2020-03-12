module.exports.data = {
    // empty
}

module.exports.run = (msg, client, args) => {

    if (msg.ticket.exist()){
        if (msg.author.id == msg.ticket.getOwner())        
            msg.ticket.delete()
        if (msg.channel.id !== msg.ticket.getID())
            msg.post.exec({code: 'tickets.deleted'})
    }

    // tout simplement


}