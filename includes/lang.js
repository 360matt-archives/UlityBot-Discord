module.exports = class {
    constructor (_client){
        this.client = _client
        this.lang = "fr"
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
            console.error(` class mal initialisée`.red)
            return;
        }

        let fs = require(`fs`)

        if (!fs.existsSync(`${__dirname}/../lang/${this.lang}.js`))
            this.lang = `fr`
        
        return new (require(`../lang/${this.lang}.js`))().get(_code, _args)
        
    }

    isSet(_code){
        if (this.client == null || this.lang == null){
            console.error(` class mal initialisée`.red)
            return;
        }

        let fs = require(`fs`)

        if (!fs.existsSync(`${__dirname}/../lang/${this.lang}.js`))
            this.lang = `fr`

        return new (require(`../lang/${this.lang}.js`))().isSet(_code)
    }

}