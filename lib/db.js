const fs = require('fs');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = class {
    constructor (table){
        this.path = `${__dirname}/../config/db/${table}.json`
        
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, '{}');

        this.adapter = new FileSync(this.path)

        this.db = low(this.adapter)
    }
}