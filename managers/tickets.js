module.exports = class {

    constructor (_client){
        this.client = _client
    }

    withMsg (_msg){
        this.id = _msg.author.id
        this.guild_id = _msg.guild.id
        this.msg = _msg
        return this;
    }

    withMember (_member){
        this.id = _member.id
        this.guild_id = _member.guild.id
        return this
    }

    withID (_id){
        this.id = _id
        return this
    }

    withGuildID (_g_id){
        this.guild_id = _g_id
        return this
    }

    // setters



    verifyCategory_LvL1 (){
        return new Promise(resolve => {
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.settings.ticket_category`):
                case this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`)) == null:
                    // si la catégorie ticket existe pas: 
    
                    // créons-là et définissons les permissions
                    this.guild_handler.channels.create(`Tickets`, {
                        type: `category`,
                        position: 1
                    }).catch(e => {console.log(e)})
                    .then(x => {
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
    
                        this.verifySupport_LvL2()
                        // on passe à l'étape suivante
                    })
    
                    break;
                default:
                    this.cat =  this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`))
                    // si tout est en ordre, sortons directement la valeur de celle de la bdd
    
                    this.verifySupport_LvL2()
                    // on passe à l'étape suivante
            }

        });


        

    }

    async verifySupport_LvL2 () {
        switch (true){
            case !this.client.db.exist(`guilds.${this.guild_id}.settings.support_role`):
            case this.guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`)) == null:
                // si le role Support n'existe pas: 

                // créons-le et définissons les permissions !!! pour la catégorie !!!
                this.support_role = await this.guild_handler.roles.create({data: {name: `Support`}})
                .then(x => {
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


                    this.verifyTicket_LvL3()
                    // on passe à l'étape suivante
                })

                break;
            default:
                this.support_role = this.guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`))
                let ow = this.cat.permissionOverwrites.get(this.support_role.id);

                // si le support n'a plus les permissions, reset
                if (ow && ow.SEND_MESSAGES === false){
                    this.cat.overwritePermissions(this.support_role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true, MANAGE_CHANNELS: true});
                }

                this.verifyTicket_LvL3()
                // on passe à l'étape suivante

        }
    }

    verifyTicket_LvL3 () {
        if (this.guild_handler.members.resolve(this.id) != null){
            // si le membre existe

            let member_handler = this.guild_handler.members.resolve(this.id)

            // si il n'a pas déjà un ticket existant
            switch (true){
                case !this.client.db.exist(`guilds.${this.guild_id}.tickets.${this.id}`):
                case this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id}`)) == null:

                    // créons le ticket
                    this.guild_handler.channels.create(`${member_handler.user.username}`, {
                        position: 99999,
                        parent: this.cat.id
                    }).catch(e => {})
                    .then(x => {
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
                                     id: this.id,
                                     allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"]
                                 }
                              ]
                            })

                        this.client.db.set(`guilds.${this.guild_id}.tickets.${this.id}`, x.id)
                        // ajout à la bdd


                        this.writeContent_LvL4()
                        // on passe à l'étape suivante
                    })

                    
                    
                default:
                    // on recupère de la bdd
                    this.tck_channel = this.guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id}`))
                    this.writeContent_LvL4()
                    // on passe à l'étape suivante
                    
            }



        }
    }

    writeContent_LvL4 (){
        // try pour éviter l'erreur "id of null"
        try{
            let custom = this.client.bestVar.withGuild(this.guild_id).withVar('ticket_text').exec()

            let posting = this.client.post.withChannel(this.tck_channel.id)

            if (typeof this.msg !== `undefined`)
                posting = posting.withLang(this.msg.lang_name)
                
            if (custom == 'undefined')
                posting.exec({code: 'tickets.notice_default'})
            else
                posting.exec({code: 'tickets.notice_custom'})
        }
        catch(e){}
    }

    // créer un ticket tout en vérifiant si tout est en ordre
    create (){
        if (this.id == null || this.guild_id == null){
            let errHandle = require(`../error`)
            errHandle(`tickets.js (ligne 36) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }
        else{
            this.guild_handler = this.client.guilds.resolve(this.guild_id)

            this.verifyCategory_LvL1().then(() => {
                return this.tck_channel.id
            })
        }
    }

}