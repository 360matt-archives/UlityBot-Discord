module.exports = class {

    constructor (_client){
        this.client = _client
    }

    withMsg (_msg){
        this.id = _msg.author.id
        this.guild_id = _msg.guild.id
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



    async create (){
        if (this.id == null || this.guild_id == null){
            let errHandle = require(`../error`)
            errHandle(`tickets.js (ligne 36) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }
        else{
            if (this.client.guilds.resolve(this.guild_id) != null){
                // si la guild existe

                let guild_handler = this.client.guilds.resolve(this.guild_id)
                let cat
                let support_role
                let tck_channel

                switch (true){
                    case !this.client.db.exist(`guilds.${this.guild_id}.settings.ticket_category`):
                    case guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`)) == null:
                        // si la catégorie ticket existe pas: créons-là et définissons les permissions


                        guild_handler.channels.create(`Tickets`, {
                            type: `category`,
                            position: 1
                        }).catch(e => {console.log(e)})
                        .then(x => {
                            cat = x

                            // définnissons les permissions pour @everyone
                            x.overwritePermissions({
                                permissionOverwrites: [
                                  {
                                     id: guild_handler.id,
                                     deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                                  },
                                ]
                            });

                            this.client.db.set(`guilds.${this.guild_id}.settings.ticket_category`, x.id)
                            // enregistrons-là dans la bdd
                        })

                        break;
                    default:
                        cat = guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.ticket_category`))
                        // si tout est en ordre, sortons directement la valeur de celle de la bdd
                }

                
                switch (true){
                    case !this.client.db.exist(`guilds.${this.guild_id}.settings.support_role`):
                    case guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`)) == null:
                        // si le role Support n'existe pas: créons-le et définissons les permissions !!! pour la catégorie !!!

                        support_role = await guild_handler.roles.create({data: {name: `Support`}})

                        cat

                        cat.overwritePermissions({
                        permissionOverwrites: [
                            {
                                id: guild_handler.id,
                                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                            },
                            {
                                id: support_role.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_CHANNELS'],
                             }   
                          ]
                        })
                        // autoriser le support aux autorisations essentielles

                        this.client.db.set(`guilds.${this.guild_id}.settings.support_role`, cat.id)
                        // enregistrons le role dans la bdd

                        break;
                    default:
                        support_role = guild_handler.roles.resolve(this.client.db.get(`guilds.${this.guild_id}.settings.support_role`))

                        ow = cat.permissionOverwrites.get(support_role.id);

                        if (ow && ow.SEND_MESSAGES === false){
                            cat.overwritePermissions(support_role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true, MANAGE_CHANNELS: true});
                        }

                }

                
                
                if (guild_handler.members.resolve(this.id) != null){
                    // si le membre existe

                    let member_handler = guild_handler.members.resolve(this.id)

                    // si il n'a pas déjà un ticket existant
                    switch (true){
                        case !this.client.db.exist(`guilds.${this.guild_id}.tickets.${this.id}`):
                        case guild_handler.channels.resolve(this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id}`)) == null:

                            guild_handler.channels.create(`${member_handler.user.username}`, {
                                position: 99999,
                                parent: cat.id
                            }).catch(e => {})
                            .then(x => {
                                tck_channel = x

                                //x.lockPermissions()
                                x.overwritePermissions(member_handler.id, {
                                    VIEW_CHANNEL: true,
                                    SEND_MESSAGES: true
                                })

                                return tck_channel.id

                            })

                            
                            
                        default:
                            return this.client.db.get(`guilds.${this.guild_id}.tickets.${this.id}`)
                    }



                }
                
            }
        }
    }

}