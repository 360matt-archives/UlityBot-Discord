exports.var = (msg, name) => {
        if (name == `lang`) {
            switch(true){
                case msg.db.exist(`member.${msg.author.id}.lang`):
                    if (fs.existsSync(`${__dirname}/../langs/${msg.db.get(`member.${msg.author.id}.lang`)}.js`)) if (require(`${__dirname}/../langs/${msg.db.get(`member.${msg.author.id}.lang`)}.js`).enabled) return msg.db.get(`member.${msg.author.id}.lang`)
                case msg.channel.type !== `dm`:
                    if (msg.db.exist(`guild.${msg.guild.id}.lang`)) if (fs.existsSync(`${__dirname}/../langs/${msg.db.get(`guild.${msg.guild.id}.lang`)}.js`))if (require(`${__dirname}/../langs/${msg.db.get(`member.${msg.author.id}.lang`)}.js`).enabled) return msg.db.get(`guild.${msg.guild.id}.lang`)
                default: return msg.config.default.lang
            }
        }
        else{
            if (msg.channel.type !== `dm`){
                switch(true){
                    case msg.db.exist(`member.${msg.author.id}.${name}`):
                        return msg.db.get(`member.${msg.author.id}.${name}`)
                    case msg.db.exist(`guild.${msg.guild.id}.${name}`):
                        return msg.db.get(`guild.${msg.guild.id}.${name}`)
                    default: return msg.config.default[`${name}`]
                }
            }
            else{
                switch(true){
                    case msg.db.exist(`member.${msg.author.id}.${name}`):
                        return msg.db.get(`member.${msg.author.id}.${name}`)
                    default: return msg.config.default[`${name}`]
                }     
            }
        }
}
