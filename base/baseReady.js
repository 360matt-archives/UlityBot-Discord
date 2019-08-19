exports.execute = (client) => {
    const richPresence = require(`${__dirname}/../includes/richPresence.js`).execute.bind(null, client)


    
    richPresence()
}