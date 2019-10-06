exports.check = (msg, data, isIt = null) => {

    if (data.startsWith('<@') && data.endsWith('>')) { data = data.slice(2, -1); }
    if (data.startsWith('<#') && data.endsWith('>')) { data = data.slice(2, -1); }

    switch(isIt){
        case null:
            if (typeof data.id !== `undefined`) return true
            if (typeof msg.aliases[data] !== `undefined`) return true
            if (typeof msg.commandes[data] !== `undefined`) return true
            if (msg.client.channels.some(x => x.id === data)) return true
            if (msg.client.users.some(x => x.id === data)) return true
            if (msg.client.guilds.some(x => x.id === data)) return true
            if (msg.client.emojis.some(x => x.id === data)) return true
        case `command`: case `commande`: case `commandes`:
            if (typeof msg.commandes[data] !== `undefined`) return true
            if (typeof msg.aliases[data] !== `undefined`) return true
        case `channel`: case `channels`: case `salon`: case `salons`:
            if (msg.client.channels.some(x => x.id === data)) return true
        case `user`: case `users`: case `member`: case `members`: case `membre`: case `membres`:
            if (msg.client.users.some(x => x.id === data)) return true
        case `guild`: case `guilds`: case `server`: case `servers`: case `serveur`: case `serveurs`:
            if (msg.client.guilds.some(x => x.id === data)) return true
        case `emojis`:
            if (msg.client.emojis.some(x => x.id === data)) return true
        case `number`: case `nombre`:
            if (!isNaN(data)) return true
        }
    
    return false

}