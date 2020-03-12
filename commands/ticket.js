module.exports.data = {
    cooldown: 20
}

module.exports.run = (msg, client, args) => {
    console.log(msg.ticket.getID())

    if (msg.ticket.exist())
        msg.post.exec({
            code: 'tickets.already_created',
            args: msg.ticket.getID()
        })
    else
        msg.ticket.create().then(x => {
            msg.post.exec({
                code: 'tickets.created',
                args: x
            })
        })
}