module.exports = class {
    constructor (_client){
        this.client = _client
    }

    withMsg (_msg){ this.msg = _msg; return this; }
    withVar (_var){ this.var = _var; return this; }
    set (_content){ this.content = _content; return this; }

    withGuild (_id){
        this.type = "guilds";
        this.id = _id;
        return this; 
    }

    withMember (_id){
        this.type = "members";
        this.id = _id;
        return this; 
    }

    exec (){
        if (this.type != null && this.id != null && this.var != null){
            let link = this.type + "." + this.id + ".vars." + this.var
            let oldContent = this.client.db.get(link)

            if (typeof this.content !== undefined)
                this.client.db.set(link, this.content)

            return oldContent;
        }
        else{
            if (this.msg != null && this.var != null){
                if (this.client.db.exist(`guilds.${this.msg.guild.id}.vars.${this.var}`))
                    return this.client.db.get(`guilds.${this.msg.guild.id}.vars.${this.var}`)
                if (this.client.db.exist(`members.${this.msg.author.id}.vars.${this.var}`))
                    return this.client.db.get(`members.${this.msg.author.id}.vars.${this.var}`)
                if (this.client.config.defaults !== null)
                    if (this.client.config.defaults[this.var] !== null)
                        return this.client.config.defaults[this.var];
            }
            else{
                let errHandle = require(`../error`)
                errHandle(`bestVar.js (ligne 44) `.yellow + `:` + ` class mal initialisée`.red)
                return;
            }
        }
}



}










