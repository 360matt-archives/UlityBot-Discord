module.exports.data = {
    permission: "MANAGE_MESSAGES"
}

module.exports.run  = (msg) => {
    let _id = msg.author.id

    return msg.matchyy[1].replace(/et que je suis/, `et il est`)
        .replace(/et que je/, `et il`)
        .replace(/et que j'ai/, `et il a`)
        .replace(/et que/, `et`)

        .replace(/j'ai pas/, `<@!${_id}> n'a pas`)
        .replace(/j'ai/, `<@!${_id}> a`)
        .replace(/je (ne )?suis pas/, `<@!${_id}> n'est pas`)
        .replace(/je suis/, `<@!${_id}> est`)
        .replace(/je ne vais/, `<@!${_id}> ne va`)
        .replace(/je vais/, `<@!${_id}> va`)
        .replace(/je ne me suis/, `<@!${_id}> ne s'est`)
        .replace(/je me suis/, `<@!${_id}> s'est`)
        .replace(/je me/, `<@!${_id}> se`)
        .replace(/je n'ai/, `<@!${_id}> n'a`)
        .replace(/je/, `<@!${_id}>`)

        .replace(/tu est?|t'es/, `je suis`)
        .replace(/tu as?|t'as?/, `j'ai`)
        .replace(/tu/, `je`)
        .replace(/me/, `te`)

    
}