module.exports = class {
    constructor (_client){
        this.client = _client
        this.langClass = _client.lang
    }

    withMsg (_msg){
        this.channel = _msg.channel
        this.langClass = _msg.lang
        return this
    }

    withChannel (_ch){
        this.channel = this.client.channels.resolve(_ch)
        return this
    }


    isEmbed(data){
        try {
            

            let Discord = require(`discord.js`)
            let Embed = new Discord.MessageEmbed()
            .setTitle(this.langClass.get(`${data.code}_title`))
            .setDescription(this.langClass.get(`${data.code}_description`))


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
            this.channel.send(this.langClass.get(`${data.code}_single`)).catch(e => {})
        } catch (e) {
            console.error(e)
        }
    }

    exec (data){

        if (typeof data.code === `undefined`) return false
            if (this.langClass.isSet(`${data.code}_title`))
                this.isEmbed(data)
            else if (this.langClass.isSet(`${data.code}_single`))
                this.isSingle(data)

    }


}