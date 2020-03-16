const main = require('../index');
const ia = require('../config/ia.json');

const stringSimilarity = require('string-similarity');
const randomInt = require('random-int');
const md5 = require('md5');

let mini_cache = []

let phrases = [];
let responses = [];
let justIncludes = [];
let i = 0;

ia.forEach(x => {
    phrases[i] = x.phrase;
    responses[i] = x.response;

    if (x.justInclude == true)
        justIncludes[i] = x.phrase;

    i++;
});

main.client.on('message', (msg) => {
    if (msg.author.bot)
        return;
    if (msg.content.startsWith(main.config.default.prefix))
        return;

    let messageContent = decodeVar(msg, msg.content);
    let matches = stringSimilarity.findBestMatch(messageContent, phrases);

    let size = messageContent.length;
    let ratio = 1 - ((size/100)/2.5);
    // j'en ai chié

    if (matches.bestMatch.rating >= 0.90){
        let allResponsesOfPhrase = responses[matches.bestMatchIndex];
        let response = allResponsesOfPhrase;

        if (typeof allResponsesOfPhrase != 'string')
            response = response[randomInt(0, allResponsesOfPhrase.length-1)];

        msg.channel.send(recodeVar(msg, response))
    }
    else {
        let id;
        if (mini_cache.includes(md5(messageContent)))
            id = mini_cache(md5(messageContent));
        else{
            for (x in justIncludes){
                if (messageContent.includes(justIncludes[x])){
                    mini_cache[md5(messageContent)] = x;
                    id = x;
                    break;
                }
            }
        }
        if (id){
            if (typeof responses[id] == 'string')
                response = responses[id]
            else
                response = responses[id][randomInt(0, responses[id].length-1)];
            
            msg.channel.send(recodeVar(msg, response))
        }
    }

});

function decodeVar (msg, content){
    content = content.split(`<@!${main.client.user.id}>`).join('<@bot>')
    content = content.split(`<@!${msg.author.id}>`).join('<@author>')

    return content;
}

function recodeVar (msg, content){
    content = content.split('<@bot>').join(`<@!${main.client.user.id}>`)
    content = content.split('<@author>').join(`<@!${msg.author.id}>`)

    return content;
}