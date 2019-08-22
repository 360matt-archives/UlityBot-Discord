exports.texte = (msg, count = 1) => {
    return msg.args.slice(count-1).join(' ')
}