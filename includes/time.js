function convertSec(s){
    var d, h, m
    m = Math.floor(s / 60)
    s = s % 60
    h = Math.floor(m / 60)
    m = m % 60
    d = Math.floor(h / 24)
    h = h % 24
    h += d * 24

    value = ``

    if (h == 1) value += `${h} heure `
    if (h >= 2) value += `${h} heures `
    if (m == 1) value += `${m} minute `
    if (m >= 2) value += `${m} minutes `
    if (s == 1) value += `${s} seconde `
    if (s >= 2) value += `${s} secondes `

    return value
}

exports.time = (msg, data = {}) => {
    if (typeof data.type === `undefined`) data.type = `s`
    if (data.type !== `now`) if (typeof data.time === `undefined`) return console.error(`Vous devez préciser le temps (secondes ou millisecondes) à traduire`)
    switch(type){
        case `s`:
            return convertSec(data.time)
            break;
        case `ms`:
            return convertSec(Math.round(data.time)/1000)
            break;
        case `now`:
            return Math.round((new date).getTime()/1000)
            break;
    }
}