exports.give = (msg, count, author = undefined) => {
    switch (typeof author !== `undefined`){
        case true:
            switch (typeof author.id !== `undefined`){
                case true:
                    _ID = author.id
                case false:
                    _ID = author
            }
        case false:
            _ID = msg.author.id
    }

    if (msg.db.exist(`member.${_ID}.eco`)){ msg.db.add(`member.${_ID}.eco`, count) }
    else{ msg.db.put(`member.${_ID}.eco`, count) }

    return true
}

exports.take = (msg, count, author = undefined) => {
    switch (typeof author !== `undefined`){
        case true:
            switch (typeof author.id !== `undefined`){
                case true:
                    _ID = author.id
                case false:
                    _ID = author
            }
        case false:
            _ID = msg.author.id
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

exports.set = (msg, count, author = undefined) => {
    switch (typeof author !== `undefined`){
        case true:
            switch (typeof author.id !== `undefined`){
                case true:
                    _ID = author.id
                case false:
                    _ID = author
            }
        case false:
            _ID = msg.author.id
    }
    msg.db.put(`member.${_ID}.eco`, count)

    return true
}

exports.reset = (msg, author = undefined) => {
    switch (typeof author !== `undefined`){
        case true:
            switch (typeof author.id !== `undefined`){
                case true:
                    _ID = author.id
                case false:
                    _ID = author
            }
        case false:
            _ID = msg.author.id
    }

    if (msg.db.exist(`member.${_ID}.eco`)){ msg.db.delete(`member.${_ID}.eco`) }
    return true
}

exports.get = (msg, author = undefined) => {
    switch (typeof author !== `undefined`){
        case true:
            switch (typeof author.id !== `undefined`){
                case true:
                    _ID = author.id
                case false:
                    _ID = author
            }
        case false:
            _ID = msg.author.id
    }

    if (msg.db.exist(`member.${_ID}.eco`)){ return msg.db.get(`member.${_ID}.eco`) }
    else { return 0 }
}


