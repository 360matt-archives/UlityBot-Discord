exports.give = (msg, count, member = null) => {
    switch (typeof member !== `undefined`){
        case true:
            switch (typeof member.id !== `undefined`){
                case true:
                    _ID = member.id
                case false:
                    _ID = member
            }
        case false:
            _ID = msg.member.id
    }

    if (msg.db.exist(`members.${_ID}.eco`)){ msg.db.add(`members.${_ID}.eco`, count) }
    else{ msg.db.put(`members.${_ID}.eco`, count) }

    return true
}

exports.take = (msg, count, member = null) => {
    switch (typeof member !== `undefined`){
        case true:
            switch (typeof member.id !== `undefined`){
                case true:
                    _ID = member.id
                case false:
                    _ID = member
            }
        case false:
            _ID = msg.member.id
    }

    if (msg.db.exist(`members.${_ID}.eco`)){ msg.db.take(`members.${_ID}.eco`, count) }

    return true
}

exports.set = (msg, count, member = null) => {
    switch (typeof member !== `undefined`){
        case true:
            switch (typeof member.id !== `undefined`){
                case true:
                    _ID = member.id
                case false:
                    _ID = member
            }
        case false:
            _ID = msg.member.id
    }
    msg.db.put(`members.${_ID}.eco`, count)

    return true
}

exports.reset = (msg, member = null) => {
    switch (typeof member !== `undefined`){
        case true:
            switch (typeof member.id !== `undefined`){
                case true:
                    _ID = member.id
                case false:
                    _ID = member
            }
        case false:
            _ID = msg.member.id
    }

    if (msg.db.exist(`members.${_ID}.eco`)){ msg.db.delete(`members.${_ID}.eco`) }
    return true
}

exports.get = (msg, member = null) => {
    switch (typeof member !== `undefined`){
        case true:
            switch (typeof member.id !== `undefined`){
                case true:
                    _ID = member.id
                case false:
                    _ID = member
            }
        case false:
            _ID = msg.member.id
    }

    if (msg.db.exist(`members.${_ID}.eco`)){ return msg.db.get(`members.${_ID}.eco`) }
    else { return 0 }
}


