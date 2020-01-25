module.exports.data = {
    permission: ""
}


module.exports.run = async (msg, client, args) => {
    msg.channel.send("Truc")

    let id = await msg.ticket.create()

    console.log(await msg.ticket.exist())

    msg.ticket.delete(id).then(async () => {
        setTimeout(async () => {
            console.log(await msg.ticket.exist())
        }, 5000);


        
    })

    
}