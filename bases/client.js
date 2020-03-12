module.exports = class {

    constructor (){
        const Discord = require(`discord.js`);
        this.client = new Discord.Client();

        this.reset(this.client);
    }

    reset (_client = this.client) {
        this.client = _client;
        for (let i=0; i<=2; i++){
            this.client.db = require(`../includes/db.js`)
            this.client.bestVar = new (require(`../includes/bestVar.js`))(this.client)
            this.client.config = require(`../data/config.json`)
            this.client.hasPermission = new (require(`../includes/hasPermission`))(this.client)
            this.client.cooldown = new (require(`../includes/cooldown.js`))(this.client)
            this.client.time = new (require(`../includes/time.js`))(this.client)
            this.client.lang = new (require(`../includes/lang.js`))(this.client)
            this.client.ticket = new (require(`../managers/tickets/tickets.js`))(this.client)
            this.client.post = new (require(`../includes/post.js`))(this.client)

        }
    }

    add (_key, _value){
        this[_key] = _value;
        this.reset(this);
        return this;
    }

}