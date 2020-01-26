module.exports = class {

    constructor (_client){
        this.client = _client
    }

    withMsg (_msg){
        this.id_member = _msg.author.id
        this.guild_id = _msg.guild.id
        this.msg = _msg
        return this;
    }

    withMember (_member){
        this.id_member = _member.id
        this.guild_id = _member.guild.id
        return this
    }

    withID (_id){
        this.id_member = _id
        return this
    }

    withGuildID (_g_id){
        this.guild_id = _g_id
        return this
    }

    withTicketID (_t_id){
        this.tck_id = _t_id
        return this
    }

    // setters



    async verifyCategory_LvL1 (){
        return new Promise(async resolve => {
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.settings.ticket_category`):
                case !this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`)):
                    // si la catégorie ticket existe pas: 
    
                    // créons-là et définissons les permissions
                    this.guild_handler.channels.create(`Tickets`, {
                        type: `category`,
                        position: 1
                    }).catch(e => {console.log(e)})
                    .then(async x => {
                        // définnissons les permissions pour @everyone
                        x.overwritePermissions({
                            permissionOverwrites: [
                              {
                                 id: this.guild_id,
                                 deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                              },
                            ]
                        });
    
                        this.client.db.set(`guilds.${this.guild_id}.settings.ticket_category`, x.id)
                        // enregistrons-là dans la bdd
    
                        this.cat = x
    
                        resolve(await this.verifySupport_LvL2())
                        // on passe à l'étape suivante
                    })
    
                    break;
                default:
                    this.cat =  this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`))
                    // si tout est en ordre, sortons directement la valeur de celle de la bdd
    
                    resolve(await this.verifySupport_LvL2())
                    // on passe à l'étape suivante
            }

        });
    }

    async verifySupport_LvL2 () {
        return new Promise(async resolve => {
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.settings.support_role`):
                case !this.guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`)):
                    // si le role Support n'existe pas: 

                    // créons-le et définissons les permissions !!! pour la catégorie !!!
                    this.support_role = await this.guild_handler.roles.create({data: {name: `Support`}})
                    .then(async x => {
                        this.cat.overwritePermissions({
                            permissionOverwrites: [
                                {
                                    id: this.guild_id,
                                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                                },
                                {
                                    id: x.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_CHANNELS'],
                                }   
                            ]
                            })
                            // autoriser le support aux autorisations essentielles
            
                            this.client.db.set(`guilds.${this.guild_id}.settings.support_role`, x.id)
                            // enregistrons le role dans la bdd


                        resolve(await this.verifyTicket_LvL3())
                        // on passe à l'étape suivante
                    })

                    break;
                default:
                    this.support_role = this.guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`))
                    let ow = this.cat.permissionOverwrites.get(this.support_role.id);

                    // si le support n'a plus les permissions, reset
                    if (ow && ow.SEND_MESSAGES === false)
                        this.cat.overwritePermissions(this.support_role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true, MANAGE_CHANNELS: true});

                    resolve(await this.verifyTicket_LvL3())
                    // on passe à l'étape suivante

            }
        })
    }

    async verifyTicket_LvL3 () {
        return new Promise(async resolve => {
            if (this.guild_handler.members.resolve(this.id_member) != null){
                // si le membre existe

                let member_handler = this.guild_handler.members.resolve(this.id_member)

                // si il n'a pas déjà un ticket existant
                switch (true){
                    case !this.client.db.exist(`guilds.${this.guild_id}.tickets.${this.id_member}`):
                    case !this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id_member}`)):

                        // créons le ticket
                        this.guild_handler.channels.create(`${member_handler.user.username}`, {
                            position: 99999,
                            parent: this.cat.id
                        }).catch(e => {})
                        .then(async x => {
                            this.tck_channel = x

                            // définissons les permissions
                            x.lockPermissions()
                            x.overwritePermissions({
                                permissionOverwrites: [
                                    {
                                        id: this.guild_id,
                                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                                    },
                                    {
                                        id: this.support_role.id,
                                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_CHANNELS'],
                                    },
                                    {
                                        id: this.id_member,
                                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"]
                                    }
                                ]
                                })

                            this.client.db.set(`guilds.${this.guild_id}.tickets.${this.id_member}`, x.id)
                            this.client.db.set(`tickets.${x.id}`, {guild_id: this.guild_id, member_id: this.id_member})
                            // ajout à la bdd


                            resolve(await this.writeContent_LvL4())
                            // on passe à l'étape suivante
                        })

                    default:
                        // on recupère de la bdd
                        this.tck_channel = this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id_member}`))
                        resolve()
                        // on passe à l'étape suivante
                        
                }
            }
        })
    }

    writeContent_LvL4 (){
        return new Promise(async resolve => {
            try {
                let b_var = this.client.bestVar.withGuild(this.guild_id)

                let custom = b_var.withVar('ticket_text').get()
                // texte custom
    
                let posting = this.client.post.withChannel(this.tck_channel.id)
                let prefix = b_var.withVar('prefix').get()
    
                posting = posting.withLang(b_var.withVar('lang').get())
                
    
                if (!custom)
                    posting.exec({code: 'tickets.notice_default', args: prefix})
                else
                    posting.exec({code: 'tickets.notice_custom', args: [prefix, custom]})
                    
                resolve()
            } catch (e) {}
        })
    }

    // créer un ticket tout en vérifiant si tout est en ordre
    async create (){
        return new Promise(async (resolve, reject) => {
            if (!(this.id_member && this.guild_id)){
                console.error(`class mal initialisée`.red)
                reject('class mal initialisée')
                return;
            }
            else{
                this.guild_handler = this.client.guilds.resolve(this.guild_id)

                this.verifyCategory_LvL1().then(() => {
                    resolve(this.tck_channel.id)
                })
                    
                

            }
        })
    }

    exist (id = null){
        if (!id){
            if (!(this.id_member && this.guild_id))
                return console.error(`class mal initialisée`.red)

            id = this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id_member}`)

            if (id == 'undefined')
                return false
        }

        let exist = this.client.db.exist(`tickets.${id}`)


        if (!this.client.channels.has(id)){
            if (exist)
                this.client.db.delete(`tickets.${id}`)
            return false
        }            
        else{
            if (!exist)
                this.delete(id)

            return true
        }
    }

    getID (){
        if (!(this.id_member && this.guild_id))
            return console.error(`class mal initialisée`.red)
        else if (this.exist())
            return this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id_member}`)
        return 0
    }

    delete (id = null){
        return new Promise(async (resolve, reject) => {
            if (!id)
                if (this.exist())
                    id = this.getID()
                else return

            if (this.client.channels.has(id))
                this.client.channels.resolve(id).delete().then(() => {
                    let data = this.client.db.get(`tickets.${id}`)

                    if (this.client.db.exist(`guilds.${data.guild_id}.tickets.${data.member_id}`))
                        this.client.db.delete(`guilds.${data.guild_id}.tickets.${data.member_id}`)

                    this.client.db.delete(`tickets.${id}`)

                    resolve()
                })
            
        })
    }
}