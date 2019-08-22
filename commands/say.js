exports.data = {
    permission: `allow`
}

exports.run = async (msg) => {
    msg.yes({
        single: msg.texte()
    })
}