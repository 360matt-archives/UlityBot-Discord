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

    if (msg.db.exist(`member.${_ID}.eco`)){ msg.db.add(`member.${_ID}.eco`, count) }
    else{ msg.db.put(`member.${_ID}.eco`, count) }

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

    if (msg.db.exist(`member.${_ID}.eco`)){ 

        if (Number(msg.db.get(`member.${_ID}.eco`)) < Number(count)){
            msg.db.put(`member.${_ID}.eco`, 0) 
        }
        else{
            msg.db.take(`member.${_ID}.eco`, count) 
        }
    }

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
    msg.db.put(`member.${_ID}.eco`, count)

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

    if (msg.db.exist(`member.${_ID}.eco`)){ msg.db.delete(`member.${_ID}.eco`) }
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

    if (msg.db.exist(`member.${_ID}.eco`)){ return msg.db.get(`member.${_ID}.eco`) }
    else { return 0 }
}


