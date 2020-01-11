module.exports.data = {
    permission: ""
}


module.exports.run = (msg, client, args) => {
    msg.channel.send("Truc")
    msg.channel.send(msg.lang.get(`test`, `bb`))
}