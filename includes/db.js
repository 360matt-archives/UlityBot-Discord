const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const DataPath = `../data/data.json`
const adapter = new FileSync(`${__dirname}/${DataPath}`)
const db = low(adapter)


exports.get = (name) => { 
    let response = db.get(name).value()

    if (response == null)
        return "Aucune valeur"
    return response
}

exports.set = (name, value) => { db.set(name, value).write() }

exports.push = (name, key) => { db.get(name).push(key).write() }

exports.exist = (name) => {if (!db.has(name).value()){ return false; } else{ return true; } }

exports.delete = (name) => { db.unset(name).write() }

exports.add = (name, increment) => { 
    if (!this.exist(name))
        this.set(name, 0)
    db.update(name, n => Number(n) + Number(increment)).write() 
}

exports.take = (name, increment) => { 
    if (!this.exist(name))
        this.set(name, 0)
    else
        db.update(name, n => Number(n) - Number(increment)).write()
 }

exports.delete_array = (name, key) => {	db.get(name).pull(key).write() }