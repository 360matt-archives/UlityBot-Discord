const main = require('../../index');
const scripts = require('./scripts')

module.exports.input = (msg, content) => {
    content = content.split(`<@!${main.client.user.id}>`).join('<@bot>')
    content = content.split(`<@!${msg.author.id}>`).join('<@author>')  

    return content;
}

module.exports.output = (msg, content) => {
    content = content.split('<@bot>').join(`<@!${main.client.user.id}>`)
    content = content.split('<@author>').join(`<@!${msg.author.id}>`)

    content = scripts.parseScript(msg, content);

    return content;
}

