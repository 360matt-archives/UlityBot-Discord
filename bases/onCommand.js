const main = require('../index');

const { Structures } = require('discord.js');
const fs = require(`fs`);

Structures.extend('Message', Message => {
    class MessageExtended extends Message {
      constructor(client, data, channel) {
        super(client, data, channel);
        this.argsman = new (require('../lib/argsman'))(this);
      }
    }
    return MessageExtended;
});

let cmdChecks = [], after = []
let pathFolder = `${__dirname}/onCommand`
let pathCmdFolder = `${__dirname}/../commands`

main.commands = [], main.aliases = []

if (fs.existsSync(`${pathFolder}/checks`)){
    fs.readdir(`${pathFolder}/checks`, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${pathFolder}/checks/${file}`).isFile())
                cmdChecks.push(require(`${pathFolder}/checks/${file}`))
        })
    });
}

if (fs.existsSync(`${pathFolder}/after`)){
    fs.readdir(`${pathFolder}/after`, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${pathFolder}/after/${file}`).isFile())
                after.push(require(`${pathFolder}/after/${file}`))
        })
    });
}

if (fs.existsSync(pathCmdFolder)){
    fs.readdir(pathCmdFolder, (err, files) => {
        files.forEach(file => {
            if (fs.lstatSync(`${pathCmdFolder}/${file}`).isFile()){
                let x = require(`${pathCmdFolder}/${file}`);

                if (typeof x.run !== 'undefined'){
                    main.commands[file.replace(".js", '')] = x;

                    if (x.data)
                        if (x.data.aliases)
                            x.data.aliases.forEach(x => main.aliases[x] = file.replace(".js", ""))
                    }
            }
        })
    });
}

main.client.on('message', (msg) => {
    try{
        if (msg.author.bot || !msg.content.startsWith(main.config.default.prefix))
            return;
    
        msg.args = msg.content.slice(main.config.default.prefix.length).trim().split(/ +/g);
        msg.command = msg.args.shift().toLowerCase();
        
        let obj = main.commands[msg.command]
        if (obj == null){
            let cmd = main.aliases[msg.command]
            obj = main.commands[cmd]
            msg.command = cmd
            if (obj == null){
                msg.channel.send(main.lang.get('global.unknown_command', msg.command))
                return;
            }
        }

        for (let x in cmdChecks)
            if (cmdChecks[x](obj, msg, msg.command, msg.args) == false)
                return;

        let status = obj.run(msg, msg.args)
        after.forEach(x => x(obj, msg, msg.command, msg.args, status))
    }
    catch(e){
        console.error(e)
    }
})

module.exports.getCommand = (cmd) => {
    if (main.commands[cmd])
        return main.commands[cmd];
    else if (main.aliases[cmd])
        return main.commands[cmd]
    else
        return false;
}