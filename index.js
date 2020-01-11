const Discord = require(`discord.js`);
const ClientManager = require(`./bases/client.js`);
const MsgManager = require(`./bases/msg`)
const CommandManager = require(`./bases/commands`)
const fs = require(`fs`)
client = new ClientManager().client;
config = client.config;

var colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


client.login(config.bot.token)
.catch((e) => {
    if (e.code === "TOKEN_INVALID")
        console.error("Le token dans le fichier de configuration n'est pas correct");
    else
        console.error(e)
})


client.on("ready", () => {
    console.log(`Bot `.grey + `connecté avec succès`.green + ` en tant que `.grey + `${client.user.tag}`.cyan)
    client = new (require(`./bases/ready.js`))(client).exec()

})

client.on("message", (msg) => {
    if (msg.author.bot)
        return;


    msg = new MsgManager(msg, client).msg
    msg.prefix = msg.bestVar.withVar("prefix").withMsg(msg).exec()

    if (msg.content.startsWith(msg.prefix)){
        // reconnu comme une commande

        msg.add(`args`, msg.content.slice(msg.prefix.length).trim().split(/ +/g));
        msg.add(`command`, msg.args.shift().toLowerCase());

        try {
            if (fs.existsSync(`${__dirname}/commands/${msg.command}.js`)) { 
                new CommandManager(msg, client).exec()


            }
          } catch(err) {
            console.error(err)
          }

        
    }

    

    
})