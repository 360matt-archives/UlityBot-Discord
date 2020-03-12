module.exports = class {

    
    constructor (_msg, _client){
        this.msg = _msg;
        this.client = _client;
        this.msg.add = this.add;
        this.msg.reset = this.reset;

        this.reset(_msg, _client);
    }

    reset (_msg, _client = this.client) {
        this.msg = _msg;

        for (let i=0; i<=2; i++){
            this.msg.bestVar = new (require(`../includes/bestVar.js`))(this.client).withMsg(this.msg)
            this.msg.lang_name = this.msg.bestVar.withVar(`lang`).get()
            this.msg.removeAfter = require(`../includes/removeAfter`)
            this.client.hasPermission = new (require(`../includes/hasPermission`))(this.client).withMember(this.msg.author.id).withGuild(this.msg.guild.id)
            this.msg.cooldown = new (require(`../includes/cooldown.js`))(this.client).command(this.msg.command).withMember(this.msg.author.id)
            this.msg.lang = new (require(`../includes/lang.js`))(this.client).withMsg(this.msg)
            this.msg.ticket = new (require(`../managers/tickets/tickets.js`))(this.client, this.msg)
            this.msg.post = new (require(`../includes/post.js`))(this.client).withMsg(this.msg)
            this.msg.time = new (require(`../includes/time.js`))(this.client).withLang(this.msg.lang_name)
            this.msg.argMan = new (require(`../includes/argsMan.js`))(this.client, this.msg)
        }
    }

    add (_key, _value){
        this[_key] = _value;
        this.reset(this);
        return this;
    }
}