exports.resolve = (msg, data, ifIs = null) => {

    if (data.startsWith('<@') && data.endsWith('>')) { data = data.slice(2, -1); }
    if (data.startsWith('<#') && data.endsWith('>')) { data = data.slice(2, -1); }

    if (ifIs === null){
        if (typeof data.id !== `undefined`) return data
        if (msg.client.channels.some(x => x.id === data)) return msg.client.channels.get(data)
        if (msg.client.users.some(x => x.id === data)) return msg.client.users.get(data)
        if (msg.client.guilds.some(x => x.id === data)) return msg.client.guilds.get(data)
        if (msg.client.emojis.some(x => x.id === data)) return msg.client.emojis.get(data)
    }
    else{
        switch(ifIs){
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
            default: return false
        }
    }


    return false

}