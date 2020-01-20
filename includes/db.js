const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const DataPath = `../data/data.json`
const adapter = new FileSync(`${__dirname}/${DataPath}`)
const db = low(adapter)

exports.db = () => {return db}

exports.get = (name) => { 
    let response = db.get(name).value()
    return (response == null) ? 'undefined' : response
}

exports.set = (name, value) => { db.set(name, value).write() }

exports.push = (name, key) => { db.get(name).push(key).write() }

exports.exist = (name) => { return (db.has(name).value()) }

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
        if (!isNaN(this.get(name)))
            db.update(name, n => Number(n) - Number(increment)).write()
 }

exports.delete_array = (name, key) => {	db.get(name).pull(key).write() }