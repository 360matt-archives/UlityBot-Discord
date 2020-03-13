const main = require('../index');
const fs = require('fs');

module.exports = class {
    constructor (lang){
        this.lang = lang;
    }

    get (name, ...args){
        let lang_file = `${__dirname}/../languages/${this.lang}.js`;
        let default_lang_file = `${__dirname}/../languages/${main.config.default.lang}.js`;

        let lang_object;

        if (fs.existsSync(lang_file))
            lang_object = require(lang_file).expressions;
        else if (fs.existsSync(default_lang_file))
            lang_object = require(default_lang_file).expressions;
        else
            return null;

        let final = lang_object;
        name.split(".").forEach(x => {
            if (final != null)
                if (typeof final[x] !== "undefined")
                    final = final[x];
            else
                final = null;
        });

        if (typeof final === 'function')
            return final(...args);
        else
            return final;
    }
}