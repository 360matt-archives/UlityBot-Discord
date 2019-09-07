exports.resolve = (msg, data, ifIs = null) => {

    if (data.startsWith('<@') && data.endsWith('>')) { data = data.slice(2, -1); }
    if (data.startsWith('<#') && data.endsWith('>')) { data = data.slice(2, -1); }

    switch(ifIs){
        case null:
            if (typeof msg.aliases[data] !== `undefined`) return msg.commandes[msg.aliases[data]]
            if (typeof msg.commandes[data] !== `undefined`) return msg.commandes[data]
            if (typeof data.id !== `undefined`) return data
            if (msg.client.channels.some(x => x.id === data)) return msg.client.channels.get(data)
            if (msg.client.users.some(x => x.id === data)) return msg.client.users.get(data)
            if (msg.client.guilds.some(x => x.id === data)) return msg.client.guilds.get(data)
            if (msg.client.emojis.some(x => x.id === data)) return msg.client.emojis.get(data)
            break
        case `command`: case `commande`: case `commandes`:
            if (typeof msg.commandes[data] !== `undefined`){ 
                msg.commandes[data][`name`] = data
                return msg.commandes[data]
            }
            if (typeof msg.aliases[data] !== `undefined`){ 
                msg.commandes[msg.aliases[data]][`name`] = msg.aliases[data]
                return msg.commandes[msg.aliases[data]]
            }
            break
        case `channel`: case `channels`: case `salon`: case `salons`:
            if (msg.client.channels.some(x => x.id === data)) return msg.client.channels.get(data)
            break
        case `user`: case `users`: case `member`: case `members`: case `membre`: case `membres`:
            if (msg.client.users.some(x => x.id === data)) return msg.client.users.get(data)
            break
        case `guild`: case `guilds`: case `server`: case `servers`: case `serveur`: case `serveurs`:
            if (msg.client.guilds.some(x => x.id === data)) return msg.client.guilds.get(data)
            break
        case `emojis`:
            if (msg.client.emojis.some(x => x.id === data)) return msg.client.emojis.get(data)
        }
    
    return false

}