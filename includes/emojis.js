exports.get = (msg, name, ReturnID = false) => {

    emojis = {
        success: {
            id: `583763204421845011`,
            animated: false
        },
        failed: {
            id: `583763203994157057`,
            animated: false
        },








    }
    if (ReturnID) return emojis[name][id]

    switch(emojis[name][`animated`]){
        case true: return `<a:${name}:${emojis[name].id}>`
        case false: return `<:${name}:${emojis[name].id}>`
    }
}