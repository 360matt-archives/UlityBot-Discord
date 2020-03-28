const main = require('../../index');

const fs = require(`fs`);

main.ia_scripts = []
let cmdChecks = [], after = []
let scriptsPath = `${__dirname}/../../ia_scripts`

if (fs.existsSync(`${__dirname}/checks`)){
    fs.readdir(`${__dirname}/checks`, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${__dirname}/checks/${file}`).isFile())
                cmdChecks.push(require(`${__dirname}/checks/${file}`))
        })
    });
}

if (fs.existsSync(`${__dirname}/after`)){
    fs.readdir(`${__dirname}/after`, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${__dirname}/after/${file}`).isFile())
                after.push(require(`${__dirname}/after/${file}`))
        })
    });
}

if (fs.existsSync(`${scriptsPath}`)){
    fs.readdir(`${scriptsPath}`, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${scriptsPath}/${file}`).isFile()){
                let x = require(`${scriptsPath}/${file}`);
                if (typeof x.run !== 'undefined')
                    main.ia_scripts[file.replace(".js", "")] = x;
            }
        })
    });
}


module.exports.parseScript = (msg, content) => {
    let pattern = /(?:\[\[script\=)?([A-Za-z]+)(?:\]\])/;
    let matchScript = content.match(pattern);

    if (matchScript)
        if (matchScript[1]){
            let script = matchScript[1];
            let response = execScript(msg, script);

            return (response !== null) ? content.replace(pattern, response) : void 0
        }

    return content;
}

function execScript (msg, script) {
    let obj = main.ia_scripts[script]
    if (typeof obj !== 'undefined'){
        for (let x in cmdChecks)
            if (cmdChecks[x](obj, msg, script) == false)
                return null;
            
        let response = obj.run(msg, msg.args)

        after.forEach(x => x(obj, msg, script))

        return response
    }
}