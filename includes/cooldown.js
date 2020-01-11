module.exports = class {
    constructor (_client){
        this.client = _client
    }

    command (_cmd){ this.type = _cmd; return this; }
    global (){ this.type = "global"; return this; }
    withMember (_id){ this.id = _id; return this; }

    getSetting (){
        if (this.type == null || this.client == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 13):`.yellow + ` Type `.red + ` command/global` + ` inprécisé`.red)
            return;
        }
        else{
            if (this.type == "global")
                return this.client.config.defaults.cooldown
            else{
                if (this.client.cmds[this.type]["cooldown"] != null)
                    return this.client.cmds[this.type]["cooldown"]
            }
        }
    }

    isThere (){
        if (this.id == null || this.client == null || this.type == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 29) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

        if (this.client.cmds[this.type]["cooldown"] == null)
            this.type = "global"

        if (!this.client.db.exist(`members.${this.id}.cooldown.${this.type}`))
            return true

        if (new Date().getTime() >= this.client.db.get(`members.${this.id}.cooldown.${this.type}`))
            return true
        else
            false
    }

    reset (){
        if (this.id == null || this.client == null || this.type == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 45) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

       this.client.db.delete(`members.${this.id}.cooldown.${this.type}`)

    }

    make (){

        if (this.id == null || this.client == null || this.type == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 60) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

        this.client.db.set(`members.${this.id}.cooldown.${this.type}`, Number(new Date().getTime()) + Number(this.getSetting()*1000))
    }

    getLeft (){
        if (this.id == null || this.client == null || this.type == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 70) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

        if (this.client.cmds[this.type] == null)
            this.type = "global"
        else
            if (this.client.cmds[this.type]["cooldown"] == null)
                this.type = "global"
        if (!this.client.db.exist(`members.${this.id}.cooldown.${this.type}`))
            return 0
        else
            return Math.round((new Date(this.client.db.get(`members.${this.id}.cooldown.${this.type}`)) - new Date())/1000)


    }

}