exports.data = {
    permission: `deny`,
    dm: true
}

exports.run = async (msg) => {
    msg.yes({
        single: msg.texte()
    })
}