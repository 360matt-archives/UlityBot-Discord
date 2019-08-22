function convertLiterraire(ms){
    var d, h, m, value = ``

    let diff = new Date(new Date(ms) - new Date())
    
    d = diff.getDate()-1
    h = diff.getHours()
    m = diff.getMinutes()
    s = diff.getSeconds()


    if (d == 1) value += `${d} jour `
    if (d >= 2) value += `${d} jours `
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
    switch(data.type){
        case `s`:
            return convertLiterraire(data.time*1000)
            break;
        case `ms`:
            return convertLiterraire(Math.round(data.time))
            break;
    }
}