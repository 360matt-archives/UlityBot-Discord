const main = require('../index');
const ia = require('../config/ia.json');

const fs = require(`fs`);
const stringSimilarity = require('string-similarity');
const randomInt = require('random-int');
const md5 = require('md5');

let mini_cache = []
let rgx = [];
let phrases = [];
let responses = [];
let justIncludes = [];
let i = 0;

ia.forEach(x => {
    phrases[i] = x.phrase;
    responses[i] = x.response;

    if (x.justInclude == true)
        justIncludes[i] = x.phrase;
    if (x.rgx == true)
        rgx[i] = x.phrase;

    i++;
});

main.ia_scripts_obj = [];

fs.readdir(`${__dirname}/../ia_scripts`, (err, files) => {
    files.forEach(file => {
        let x = require(`${__dirname}/../ia_scripts/${file}`);
        if (typeof x.run !== 'undefined' && typeof x.data !== 'undefined'){
            main.ia_scripts_obj[file.replace(".js", "")] = x;
        }
    })
});

main.client.on('message', (msg) => {
    try{
        if (msg.author.bot)
            return;
        if (msg.content.startsWith(main.config.default.prefix))
            return;

        let messageContent = decodeVar(msg, msg.content);
        let id = null;

        if (mini_cache.includes(md5(messageContent)))
            id = mini_cache(md5(messageContent));
        else{
            let match = stringSimilarity.findBestMatch(messageContent, phrases);

            if (match.bestMatch.rating >= 0.90)
                id = match.bestMatchIndex
            else{
                for (x in justIncludes){
                    if (messageContent.includes(justIncludes[x])){
                        mini_cache[md5(messageContent)] = x;
                        id = x;
                        break;
                    }
                }
                if (id == null){
                    for (x in rgx){
                        let matchyy = messageContent.match(rgx[x])
                        if (matchyy !== null){
                            msg.matchyy = matchyy;
                            mini_cache[md5(messageContent)] = x;
                            id = x;
                            break;
                        }
                    }
                }
            }
        }

        if (id !== null){
            let response = responses[id];

            if (responses[id] !== null){
                if (typeof response !== 'string')
                    response = response[randomInt(0, responses[id].length-1)];
                
                mini_cache[md5(messageContent)] = id;

                let finalContent = recodeVar(msg, response);

                if (finalContent !== null && typeof finalContent !== 'undefined')
                    msg.channel.send(finalContent)
            }
        }
    }
    catch(e){
        console.error(e);
    }
})

function decodeVar (msg, content){
    content = content.split(`<@!${main.client.user.id}>`).join('<@bot>')
    content = content.split(`<@!${msg.author.id}>`).join('<@author>')  

    return content;
}

function recodeVar (msg, content){
    content = content.split('<@bot>').join(`<@!${main.client.user.id}>`)
    content = content.split('<@author>').join(`<@!${msg.author.id}>`)

    content = parseScript(msg, content);
    
    return content;
}

function parseScript (msg, content){

    let pattern = /(?:\[\[script\=)?([a-zA-z]+)(?:\]\])/;
    let matchScript = content.match(pattern);

    if (matchScript !== null)
        if (matchScript[1] !== null){
            let script = matchScript[1];
            let response = execScript(msg, script);

            if (response !== null)
                content = content.replace(pattern, response);
            else 
                return;
        }

    return content;
}

function execScript (msg, script){
    if (typeof main.ia_scripts_obj[script] !== 'undefined'){
        if (typeof main.ia_scripts_obj[script].data !== 'undefined'){
            let exp_message_ia = main.lang.get("format.message_ia");

            if (!main.ia_scripts_obj[script].data.dm && msg.channel.type === 'dm'){
                msg.channel.send(main.lang.get("errors.dm_insupported", exp_message_ia))
                return null;
            }
            let silent = false;
            if (main.ia_scripts_obj[script].data.silent)
                silent = true;
            if (typeof main.ia_scripts_obj[script].data.permission !== 'undefined' && msg.channel.type !== 'dm'){
                let show_err = false;

                try {
                    show_err = !msg.member.hasPermission(main.ia_scripts_obj[script].data.permission);
                } catch (e) {
                    console.error(e);
                    show_err = true;
                }

                if (show_err && !silent){
                    msg.channel.send(main.lang.get("errors.not_permission", exp_message_ia, main.ia_scripts_obj[script].data.permission))
                    return null;
                }
                    
            }
            if (main.ia_scripts_obj[script].data.owner){
                if (!silent)
                    msg.channel.send(main.lang.get("errors.ownership_only", exp_message_ia))
            }
        }

    }

    let response = main.ia_scripts_obj[script].run(msg);

    if (typeof response !== 'undefined')
        return response;
    else
        return null;

}