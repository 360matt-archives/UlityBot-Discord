exports.toid = (msg, data) => {
    if (data.startsWith('<@') && data.endsWith('>')) { data = data.slice(2, -1); }
    if (data.startsWith('<#') && data.endsWith('>')) { data = data.slice(2, -1); }

    return data
}