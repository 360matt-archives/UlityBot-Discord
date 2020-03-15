const main = require('../index');

const { Structures } = require('discord.js');
const fs = require(`fs`);
const cooldown = require('../modules/cooldown');

Structures.extend('Message', Message => {
    class MessageExtended extends Message {
      constructor(client, data, channel) {
        super(client, data, channel);
        this.argsman = new (require('../lib/argsman'))(this);
      }
    }
    return MessageExtended;
  });


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

main.client.on('message', (msg) => {
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith(main.config.default.prefix))
        return;

    msg.args = msg.content.slice(main.config.default.prefix.length).trim().split(/ +/g);
    msg.command = msg.args.shift().toLowerCase();

    if (typeof main.aliases[msg.command] !== 'undefined')
        msg.command = main.aliases[msg.command];
    else if (!fs.existsSync(`${__dirname}/../commands/${msg.command}.js`)){
        msg.channel.send(main.lang.get('global.unknown_command', msg.command));
        return;
    }

    let cmd_object = require(`${__dirname}/../commands/${msg.command}.js`);
    if (typeof cmd_object.run !== 'undefined'){
        if (check(msg, cmd_object)){
            cmd_object.run(msg, msg.args);
            after(msg, cmd_object);
        }
    }
    else
        msg_object.channel.send(main.lang.get('global.unknown_command', msg_object.command))

})

function check (msg, cmd_o){
    if (cmd_o.data){
        console.log(msg); // debug

        if (msg.channel.type === 'dm' && !cmd_o.data.dm){
            // dm insupporté
            msg.channel.send(main.lang.get('errors.dm_insupported', msg.command));
            return false;
        }
        else if (typeof cmd_o.data.permission !== 'undefined'){
            try {
                if (!msg.member.hasPermission(cmd_o.data.permission)){
                    // no permission
                    msg.channel.send(main.lang.get('errors.not_permission', msg.command, cmd_o.data.permission));
                    return false;
                }
            } catch (e) {
                console.error(e);
                msg.channel.send(main.lang.get('errors.not_permission', msg.command, cmd_o.data.permission));
                return false;
            }

        }
        if (cmd_o.data.permission == false && !main.config.bot.owners.includes(msg.author.id)){
            // no permission owner
            msg.channel.send(main.lang.get('errors.ownership_only', msg.command));
            return false;
        }
        if (!cooldown.canUse(msg.author.id, msg.command) && !main.config.bot.owners.includes(msg.author.id)){
            // if need wait cooldown
            msg.channel.send(main.lang.get('errors.cooldown_left', msg.command, cooldown.textualLeft(msg.author.id, msg.command)));
            return false;
        }
    }
    
    return true;
}

function after (msg, cmd_o) {
    cooldown.applique(msg.author.id, msg.command);
}