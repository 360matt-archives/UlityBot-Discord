exports.data = {
    permission: `allow`,
    aliases: ["userinfo"]
}

exports.run = async (msg) => {
    if (msg.ifArg.err(1, "member")){
        id = msg.toid(msg.args[0])
        
    }
}