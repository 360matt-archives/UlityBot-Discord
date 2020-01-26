module.exports = class {
    constructor (client){
        this.client = client
    }

    withMsg (msg){ 
        this.guild_id = msg.guild.id
        this.member_id = msg.author.id
        return this
    }
    withVar (_var){ 
        this.var = _var
        return this
    }
    withGuild (id){
        this.guild_id = id
        return this
    }
    withMember (id){
        this.member_id = id
        return this
    }



    set (content = null){ 
        if ((!this.guild_id && !this.guild_id) || !this.var){
            console.error('class mal initialisée')
            return 'undefined'
        }

        if (!(this.guild_id && this.member_id) && (this.guild_id || this.member_id) && content)
            if (this.guild_id)
                return this.client.db.set(`guilds.${this.guild_id}.vars.${this.var}`, content)
            else
                return this.client.db.set(`members.${this.member_id}.vars.${this.var}`, content)

    }

    get (){
        if ((!this.guild_id && !this.guild_id) || !this.var){
            console.error('class mal initialisée')
            return 'undefined'
        }

        if (this.guild_id)
            if (this.client.db.exist(`guilds.${this.guild_id}.vars.${this.var}`))
                return this.client.db.get(`guilds.${this.guild_id}.vars.${this.var}`)
        if (this.member_id)
            if (this.client.db.exist(`members.${this.members_id}.vars.${this.var}`))
                return this.client.db.get(`members.${this.members_id}.vars.${this.var}`)
        return this.client.config.defaults[this.var]

    }

}