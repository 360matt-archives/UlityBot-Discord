const main = require('../index');
const decoder = require('./onIA/decoder')
const ia = require('../config/ia.json');

const stringSimilarity = require('string-similarity');
const randomInt = require('random-int');
const md5 = require('md5');

main.mini_cache = []

let listing = {
    phrases: [],
    justIncludes: [],
    rgx: []
}

for (i in ia){
    let phrase = ia[i]["phrase"]

    if (ia[i].justInclude)
        listing["justIncludes"][i] = phrase
    else if (ia[i].rgx)
        listing["rgx"][i] = phrase
    else
        listing["phrases"][i] = phrase
}



main.client.on('message', (msg) => {
    if (msg.author.bot || msg.content.startsWith(main.config.default.prefix))
        return;
    
    let content = decoder.input(msg, msg.content);
    let id = false;

    let t_md5 = md5(content)
    if (main.mini_cache.includes(t_md5))
        id = main.mini_cache[t_md5]
    else {
        if (listing["phrases"].length !== 0){
            let match = stringSimilarity.findBestMatch(content, listing["phrases"]);
            if (match.bestMatch.rating >= 0.90)
                id = match.bestMatchIndex
        }
        if (!id) {
            for (x in listing['justIncludes']){
                if (content.includes(listing['justIncludes'][x])){
                    id = x
                    break
                }
            }
            if (!id){
                for (x in listing['rgx']){
                    let matchyy = content.match(listing['rgx'][x]);
    
                    if (matchyy !== null){
                        id = x
                        msg.matchyy = matchyy;
                        break
                    }
                }
            }
        }
    }

    if (id){
        main.mini_cache[t_md5] = id

        let preResponse = ia[id]['response']
        if (typeof preResponse !== 'string')
            preResponse = preResponse[randomInt(0, preResponse.length-1)];
        
        let finalReponse = decoder.output(msg, preResponse);
        if (finalReponse)
            msg.channel.send(finalReponse)
    }

})