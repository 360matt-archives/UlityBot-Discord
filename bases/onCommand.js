const main = require('../index');
const fs = require(`fs`);
const time = require('../lib/time');

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

    let msg_object = new msg_class(msg);

    msg_object.set("args", msg.content.slice(main.config.default.prefix.length).trim().split(/ +/g));
    msg_object.set("command", msg_object.args.shift().toLowerCase());

    if (typeof main.aliases[msg_object.command] !== 'undefined')
        msg_object.set("command", main.aliases[msg_object.command]);
    else if (!fs.existsSync(`${__dirname}/../commands/${msg_object.command}.js`)){
        msg_object.channel.send(main.lang.get('global.unknown_command', msg_object.command))
        return;
    }

    let cmd_object = require(`${__dirname}/../commands/${msg_object.command}.js`);
    if (typeof cmd_object.run !== 'undefined'){
        if (check(msg_object, cmd_object))
            cmd_object.run(msg_object, msg_object.args);
    }
    else
        msg_object.channel.send(main.lang.get('global.unknown_command', msg_object.command))

})

function check (msg, cmd_o){
    if (!cmd_o.data)
        return true

    console.log(msg);


    if (msg.channel.type === 'dm'){
        if (cmd_o.data.dm !== null)
            if (!cmd_o.data.dm) {
                // dm insupporté
                msg.channel.send(main.lang.get('errors.dm_insupported', msg.command))
                return false;
            }
    }
    else {
        if (typeof cmd_o.data.permission !== 'undefined'){
            if (!msg.channel.guild.members.resolve(msg.author.id).hasPermission(cmd_o.data.permission)){
                // no permission
                msg.channel.send(main.lang.get('errors.not_permission', msg.command, cmd_o.data.permission))
                return false
            }
        }
    }
    if (typeof cmd_o.data.permission !== 'undefined'){
        if (cmd_o.data.permission == false){
            if (!main.config.bot.owners.includes(msg.author.id)){
                // no permission
                msg.channel.send(main.lang.get('errors.ownership_only', msg.command))
                return false;
            }
                    
        }
    }

    let cooldown = new main.db("cooldown").db;

    if (typeof cmd_o.data.cooldown !== 'undefined'){
        let path = `${msg.author.id}.${msg.command}`;
        if (cooldown.has(path).value()){
            let cooldownFinished = cooldown.get(path).value();
            if (cooldownFinished > new Date().getTime()){
                // cooldown restricted
                let timeLeft = cooldownFinished - new Date().getTime() 
                msg.channel.send(main.lang.get('errors.cooldown_left', msg.command, time.textual(timeLeft)));
                return false;
            }
        }

    }
    
    return true;
}