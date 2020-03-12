module.exports = class {
    constructor (client, msg = null){
        this.client = client

        if (msg){
            this.guild_id = msg.guild.id
            this.member_id = msg.author.id
        }
    }

    with(data) {
        this.guild_id = data.guild_id || null
        this.member_id = data.member_id || null
        this.id = data.id || null
        return this
    }

    isInitialized (hard = false){
        if ((this.id && !hard) || this.guild_id && this.member_id) return true
        else return false
    }


    exist() {
        if (!this.isInitialized()) return false

        let id

        if (this.id)
            id = this.id
        else{
            id = this.client.db.get(`guilds.${this.guild_id}.tickets.${this.member_id}`)

            if (id == 'undefined') return false
        }

        console.log('nnnnnnnnn')
        let exist = this.client.db.exist(`tickets.${id}`)

        if (exist){
            if (this.client.channels.has(`${id}`))
                return true
            this.delete()
        }
        
        return false
    }

    getID (){
        if (this.exist())
            return this.client.db.get(`guilds.${this.guild_id}.tickets.${this.member_id}`)
        return
    }

    async delete (){
        return new Promise((resolve, reject) => {
            if (!this.isInitialized()) reject('class mal initialisee')

            let id = this.getID()

            if (id !== 0){
                

                let data = this.client.db.get(`tickets.${id}`)

                if (data !== 'undefined')
                    this.client.db.delete(`guilds.${data.guild_id}.tickets.${data.member_id}`)
                    
                this.client.db.delete(`tickets.${id}`)
                this.client.channels.resolve(id).delete().then(() => {
                    resolve()
                })
                .catch(x => {
                    console.error(x)
                    reject(x)
                })
            }

        })
    }

    create (){
        return new Promise(async (resolve, reject) => {
            if (this.exist())
                resolve(this.getID())
            else if (this.isInitialized(true)){
                new (require(`${__dirname}/create.js`))(this.client, {
                    guild_id: this.guild_id,
                    member_id: this.member_id
                }).run().then((x) => {
                    resolve(x)
                })
            }
        })
                
    }

    

}