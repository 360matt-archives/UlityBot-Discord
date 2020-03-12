module.exports = class {

    constructor (client, data){
        this.client = client
        this.guild_id = data.guild_id
        this.guild = this.client.guilds.resolve(this.guild_id)
        this.member_id = data.member_id
        this.member = this.guild.members.resolve(this.member_id)
    }

    async run (){
        return new Promise(async resolve => {
            this.checkCat().then(() => {
                resolve(this.ticket.id)
            })
        })
    }

    async checkCat (){
        return new Promise(async (resolve, reject) => {
            switch(true){
                case !this.client.db.exist(`guilds.${this.guild_id}.settings.ticket_category`):
                case !this.guild.channels.has(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`)):
                    this.guild.channels.create(`Tickets`, {
                        type: `category`,
                        position: 1
                    })
                    .then(async x => {
                        x.updateOverwrite(this.guild_id, { VIEW_CHANNEL: false, SEND_MESSAGES: false});
                        this.client.db.set(`guilds.${this.guild_id}.settings.ticket_category`, x.id)
                        this.category = x

                        resolve(await this.checkSupport())
                    })
                    .catch(x => {
                        console.error(x)
                        reject(x)
                    })

                    break
                default:
                    this.category = this.guild.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`))
                    resolve(await this.checkSupport())
            }
        })
    }

    async checkSupport (){
        return new Promise(async (resolve, reject) => {
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.settings.support_role`):
                case !this.guild.roles.has(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`)):
                    this.guild.roles.create({data: {name: `Support`}})
                    .then(async x => {
                        this.support_role = x
                        this.category.updateOverwrite(this.support_role.id, { 
                            VIEW_CHANNEL: true, 
                            SEND_MESSAGES: true, 
                            MANAGE_MESSAGES: true, 
                            MANAGE_CHANNELS: true
                        })
                        .catch(x => {
                            console.error(x)
                            reject(x)
                        })
    
                        this.client.db.set(`guilds.${this.guild_id}.settings.support_role`, this.support_role.id)
                        resolve(await this.checkTicket())
                    })
                    .catch(x => {
                        console.error(x)
                        reject(x)
                    })

                    break
                default:
                    this.support_role = this.guild.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`))

                    resolve(await this.checkTicket())
            }
        })
    }

    async checkTicket (){
        return new Promise(async (resolve, reject) => {
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.tickets.${this.member_id}`):
                case !this.guild.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.member_id}`)):
                    this.guild.channels.create(`${this.member.user.username}`, {
                        position: 99999,
                        parent: this.category.id
                    })
                    .then(async x => {
                        this.ticket = x

                        this.ticket.updateOverwrite(this.member_id, { 
                            VIEW_CHANNEL: true, 
                            SEND_MESSAGES: true, 
                            EMBED_LINKS: true 
                        })
                        .catch(x => {
                            console.error(x)
                            reject(x)
                        })

                        this.client.db.set(`guilds.${this.guild_id}.tickets.${this.member_id}`, this.ticket.id)
                        this.client.db.set(`tickets.${x.id}`, {
                            guild_id: this.guild_id, 
                            member_id: this.member_id
                        })

                        resolve(await this.writeNotice())
                    })
                    .catch(x => {
                        console.error(x)
                        reject(x)
                    })

                    break;
                default:
                    this.ticket = this.guild.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.member_id}`))
                    resolve()

            }
        })
    }

    async writeNotice (){
        return new Promise(async resolve => {
            let b_var = this.client.bestVar.withGuild(this.guild_id)
            let custom = b_var.withVar('ticket_text').get()

            let posting = this.client.post.withChannel(this.ticket.id)
            let prefix = b_var.withVar('prefix').get()

            if (custom)
                posting.exec({code: 'tickets.notice_custom', args: [prefix, custom]})
            else
                posting.exec({code: 'tickets.notice_default', args: prefix})

            resolve()

        })
    }

}