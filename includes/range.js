exports.range = (min, x, max) => { return ((x-min)*(x-max) <= 0); }

exports.range.err = (msg, min, x, max) => {
    console.log(`${min} - ${x} - ${max}`)
    if ((x-min)*(x-max) <= 0){
        console.log(`${min} - ${x} - ${max}`)
        var position, reference
        if (x < min){
            position = msg.lang(`general.expressions.superior`)
            reference = min
        }
        else{
            position = msg.lang(`general.expressions.inferior`)
            reference = max
        }

        msg.no({
            code: `general.range`,
            args: [
                x,
                position,
                reference
            ]
        })
        return false
    }
    else{
        return true
    }
}

