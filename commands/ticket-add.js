module.exports.data = {
    // empty
}

module.exports.run = (msg, client, args) => {

    if (msg.ticket.exist()){
        if (msg.author.id == msg.ticket.getOwner() || msg.hasPermission.withPermission('MANAGE_CHANNELS').exec() || msg.ticket.isSupport()){

            if (msg.argMan.isSet_err(0, 'member')){
                let to_add = msg.argMan.getType(0, 'member').id

                let isInTicket = msg.ticket.exist(msg.channel.id)

                msg.ticket.addMember(isInTicket ? msg.channel.id : to_add, isInTicket ? to_add : null)
                .then(x => {
                    msg.post.exec({code: 'tickets.added', args: to_add})
                }, e => {
                    msg.post.exec({code: 'global.error'})
                })
            }
            
            
        }    
            
    }

    // tout simplement


}