module.exports = class {
    constructor (_client){
        this.client = _client
    }

    exec (){
        let presence = this.client.config.bot.presence
        var i = 0
    
        setInterval(() => {
            if (i>=presence.length)
                i = 0
            else {
                this.client.user.setActivity(presence[i], {type: "STREAMING", url: "https://www.twitch.tv/360matt"})
                i++
            }
            
        }, 10000)

        const fs = require('fs');

        this.client.cmds = []
        this.client.aliases = []

        fs.readdir(`${__dirname}/../commands`, (err, files) => {
            files.forEach(file => {
                file = file.replace(`.js`, ``)
                let littleHandler = require(`../commands/` + file)

                if (littleHandler.data != null){
                    this.client.cmds[file] = littleHandler.data

                    if (littleHandler.data.aliases != null){
                        littleHandler.data.aliases.forEach(x => {
                            this.client.aliases[x] = file
                        })
                    }

                }
                    

            });
        });

        return this.client
    }
}