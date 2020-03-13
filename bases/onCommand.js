const main = require('../index');
const fs = require(`fs`)

if (main.commands == null)
    main.commands = {};
if (main.aliases == null)
    main.aliases = {};


fs.readdir(`${__dirname}/../commands`, (err, files) => {
    files.forEach(file => {
        let x = require(`${__dirname}/../commands/${file}`);
        if (typeof x.run !== 'undefined' && typeof x.data !== 'undefined'){
            main.commands[file.replace(".js", "")] = x.data;

            if (typeof x.data.aliases !== 'undefined'){
                x.data.aliases.forEach(x => {
                    main.aliases[x] = file.replace(".js", "");
                })
            }
        }
    })
});

class msg_class {
    constructor (msg){
        for (let x in msg)
            this[x] = msg[x];

        this.argsman = new (require('../lib/argsman'))(this);
    }
    set (name, content){
        this[name] = content;
    }
    
}

main.client.on('message', (msg) => {
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith(main.config.default.prefix))
        return;

    let msg_obect = new msg_class(msg);

    msg_obect.set("args", msg.content.slice(main.config.default.prefix.length).trim().split(/ +/g));
    msg_obect.set("command", msg_obect.args.shift().toLowerCase());

    if (typeof main.aliases[msg_obect.command] !== 'undefined')
        command = main.aliases[msg_obect.command];
    else if (!fs.existsSync(`${__dirname}/../commands/${msg_obect.command}.js`)){
        msg.channel.send(main.lang.get('global.unknown_command', msg_obect.command))
        return;
    }

    let cmd_object = require(`${__dirname}/../commands/${msg_obect.command}.js`);
    if (typeof cmd_object.run !== 'undefined')
        cmd_object.run(msg_obect, msg_obect.args);
    else
        msg.channel.send(main.lang.get('global.unknown_command', msg_obect.command))



})