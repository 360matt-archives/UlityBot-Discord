module.exports.data = {
    permission: "MANAGE_MESSAGES"
}

module.exports.run  = (msg) => {
    if (msg.matchyy[1] == "j'ai")
        return `<@${msg.author.id}> a ` + msg.matchyy[2]
    else if (msg.matchyy[1] == "je" && msg.matchyy[2].split(' ')[1] == "suis")
        return `<@${msg.author.id}> est ` + msg.matchyy[2].split(' suis ').join('')
    else if (msg.matchyy[1] == "tu" && msg.matchyy[2].split(' ')[1] == "va")
        return `je vais ` + msg.matchyy[2].split(' va ').join('')
    else if (msg.matchyy[1] == "tu" && (msg.matchyy[2].split(' ')[1] == "est" || msg.matchyy[2].split(' ')[1] == "es"))
        return `je` + msg.matchyy[2].split(' est ').join(' suis ').split(' es ').join(' suis ')
    else if (msg.matchyy[1] == "je")
        return `<@${msg.author.id}> ` + msg.matchyy[2]
    else if (msg.matchyy[1] == "tu")
        return `je` + msg.matchyy[2]
    else
        return msg.matchyy[1] + msg.matchyy[2];
}