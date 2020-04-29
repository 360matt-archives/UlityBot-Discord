module.exports.data = {
    permission: "MANAGE_MESSAGES"
}

module.exports.run  = (msg) => {
    let _id = msg.author.id

    return msg.matchyy[1]
        .replace(/et que je suis/, `et il est`)
        .replace(/et que je/, `et il`)
        .replace(/et que j'ai/, `et il a`)
        .replace(/et que/, `et`)

        .replace(/moi j'ai(\W)/, `<@!${_id}> a `)
        .replace(/moi je suis(\W)/, `<@!${_id}> est `)

        .replace(/je (ne )?suis pas/, `<@!${_id}> n'est pas`)
        .replace(/je suis/, `<@!${_id}> est`)
        .replace(/je ne vais/, `<@!${_id}> ne va`)
        .replace(/je vais/, `<@!${_id}> va`)
        .replace(/je ne me suis/, `<@!${_id}> ne s'est`)
        .replace(/je me suis/, `<@!${_id}> s'est`)
        .replace(/je me/, `<@!${_id}> se`)
        .replace(/je te/, `<@!${_id}> me`)
        .replace(/je ne te/, `<@!${_id}> ne me`)
        .replace(/je t'/, `<@!${_id}> m'`)
        .replace(/je ne t'/, `<@!${_id}> ne m'`)
        .replace(/je n'aimes?/, `<@!${_id}> n'aime`)
        .replace(/j'aime toi/, `<@!${_id}> m'aime`)
        .replace(/j'aime/, `<@!${_id}> aime`)
        .replace(/je n'ais? /, `<@!${_id}> n'a`)
        .replace(/je(\W)/, `<@!${_id}> `)
        .replace(/j'ai pas(\W)/, `<@!${_id}> n'a pas`)
        .replace(/j'ai(\W)/, `<@!${_id}> a`)

        .replace(/t('es)? con/, 'je suis con')
        .replace(/(tu est?|t'est?)/, `je suis`)
        .replace(/t'aimes?/, `m'aime`)
        .replace(/(tu as?|t'as?)(\W)/, `j'ai `)
        .replace(/tu n'est?/, `je ne suis `)
        .replace(/tu n'as?/, `je n'ai `)
        .replace(/tu va(\W)/, `je vais`)
        .replace(/tu n'aimes?/, `je n'aime`)
        .replace(/tu(\W)/, `je `)
        .replace(/(\W)me(\W)/, ` te `)
        .replace(/(\W)toi(\W)/, `moi`)

    

    
}