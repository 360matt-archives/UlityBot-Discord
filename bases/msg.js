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

        for (var i=0; i<=2; i++){
            this.msg.bestVar = new (require(`../includes/bestVar.js`))(this.client).withMsg(this.msg)
            this.msg.removeAfter = require(`../includes/removeAfter`)
            this.msg.cooldown = new (require(`../includes/cooldown.js`))(this.client).command(this.msg.command).withMember(this.msg.author.id)
            this.msg.lang = new (require(`../includes/lang.js`))(this.client).withMsg(this.msg)
        }
    }

    add (_key, _value){
        this[_key] = _value;
        this.reset(this);
        return this;
    }
}