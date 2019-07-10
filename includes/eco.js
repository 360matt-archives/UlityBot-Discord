exports.give = (msg, a = null, b = null) => {
    if (typeof b !== `undefined`){
        HandleMember = msg.guild.members.get(a)
        count = b
    }
    else{
        HandleMember = msg.member
        count = a
    }

    if (msg.db.exist(`members.${HandleMember.id}.eco`)){ msg.db.add(`members.${HandleMember.id}.eco`, count) }
    else{ msg.db.put(`members.${HandleMember.id}.eco`, count) }

    return true
}

exports.take = (msg, a = null, b = null) => {
    if (typeof b !== `undefined`){
        HandleMember = msg.guild.members.get(a)
        count = b
    }
    else{
        HandleMember = msg.member
        count = a
    }

    if (msg.db.exist(`members.${HandleMember.id}.eco`)){ msg.db.take(`members.${HandleMember.id}.eco`, count) }

    return true
}

exports.set = (msg, a = null, b = null) => {
    if (typeof b !== `undefined`){
        HandleMember = msg.guild.members.get(a)
        count = b
    }
    else{
        HandleMember = msg.member
        count = a
    }

    msg.db.put(`members.${HandleMember.id}.eco`, count)

    return true
}

exports.reset = (msg, a = null) => {
    if (typeof a !== `undefined`){ HandleMember = msg.guild.members.get(a) }
    else{ HandleMember = msg.member }

    if (msg.db.exist(`members.${HandleMember.id}.eco`)){ msg.db.delete(`members.${HandleMember.id}.eco`) }
    return true
}

