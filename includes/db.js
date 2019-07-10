const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(`${__dirname}/../data/data.json`)
const db = low(adapter)


exports.get = (name) => {
	try{
		return db.get(name).value()
	}
	catch(err){
		console.error(err)
		return false;
	}
}

exports.put = (name, value) => {
	try{
		db.set(name, value)
		.write()
	}
	catch(err){
		console.error(err)
		return false;
	}
}

exports.push = (name, key) => {
	try{
		db.get(name)
		.push(key)
		.write()
	}
	catch(err){
		console.error(err)
		return false;
	}
}

exports.exist = (name) => {
	if (!db.has(name).value()){
		return false;
	} 
	else{
		return true;
	}
}

exports.delete = (name) => {
	try{
		db.unset(name).write()
		return true		
	}
	catch(err){
		console.error(err)
		return false;
	}
}

exports.add = (name, increment) => {
	db.update(name, n => Number(n) + Number(increment)).write()
}

exports.take = () => {
    db.update(name, n => Number(n) - Number(increment)).write()	
}

exports.delete_array = (name, key) => {
	try{
		db.get(name).pull(key).write()
		return true
	}
	catch(err){
		console.error(err)
		return false;
	}
}