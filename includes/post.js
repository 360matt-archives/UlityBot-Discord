module.exports = class {
    constructor (_client){
        this.client = _client
        this.langClass = _client.lang
    }

    withMsg (_msg){
        this.channel = _msg.channel
        this.langClass = this.langClass.withLang(_msg.lang_name)
        return this
    }

    withChannel (_ch){
        this.channel = this.client.channels.resolve(_ch)
        return this
    }

    withLang (_lang){
        this.langClass = this.langClass.withLang(_lang)
        return this
    }

    isEmbed(data){
        try {

            let Discord = require(`discord.js`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(this.langClass.get(`${data.code}_title`, data.args || null))
            .setDescription(this.langClass.get(`${data.code}_description`, data.args || null))

            if (typeof data.footer !== `undefined`)
                Embed.setFooter(data.footer)
            if (typeof data.color !== `undefined`)
                Embed.setFooter(data.color)
            if (typeof data.author !== `undefined`)
                Embed.setFooter(data.author)

            this.channel.send(Embed).catch(e => {})

        } catch (e) {
            console.error(e)
        }
    }


    isSingle(data){
        try {
            this.channel.send(this.langClass.get(`${data.code}_single`, data.args || null)).catch(e => {})
        } catch (e) {
            console.error(e)
        }
    }

    exec (data){

        if (typeof data.code === `undefined`) return false
        if (this.langClass.isSet(`${data.code}_title`) && this.langClass.isSet(`${data.code}_description`))
            this.isEmbed(data)
        else if (this.langClass.isSet(`${data.code}_single`))
            this.isSingle(data)

    }


}