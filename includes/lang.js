module.exports = class {
    constructor (_client){
        this.client = _client
    }

    withMsg(_msg){
        this.lang = _msg.bestVar.withVar(`lang`)
        return this
    }

    withLang(_lang){
        this.lang = _lang
        return this
    }

    get (_code, ..._args){
        if (this.client == null || this.lang == null){
            let errHandle = require(`../error`)
            errHandle(`cooldown.js (ligne 29) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

        let fs = require(`fs`)

        if (!fs.existsSync(`${__dirname}/../lang/${this.lang}.js`))
            this.lang = `fr`
        
        let value = new (require(`../lang/${this.lang}.js`))().get(_code, _args)

        if (typeof value == `function`)
            return value(_args)
        else
            return value
        
    }

}