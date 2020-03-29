const main = require('../../../index');
const Discord = require('discord.js')

let list = []

for (let x in Discord.Permissions.FLAGS)
    list.push(x)

module.exports = (obj, msg, script) => {
    if (msg.channel.type !== 'dm'){
        if (obj.data){
            let need_this = []
            let need_this_optionnal = []

            if (!msg.member.hasPermission('ADMINISTRATOR') && main.config.bot.owners.includes(msg.member.id)){
                if (typeof obj.data.permission !== 'undefined'){
                    let checking = obj.data.permission;

                    if (typeof checking == 'string'){
                        if (!list.includes(checking))
                            need_this.push(checking)
                        else 
                            if (!msg.member.hasPermission(checking))
                                need_this.push(checking)
                    }
                    else if (Array.isArray(checking)) {
                        let justOne = false

                        checking.forEach(element => {
                            let new_element = element.match(/\[(\w+)\]/);
                            let optional = (new_element !== null);
                            
                            if (optional)
                                element = new_element[1]
                        
                            if (!list.includes(element))
                                need_this.push(element)
                            else {
                                if (!msg.member.hasPermission(element)){
                                    if (!optional)
                                        need_this.push(element)
                                    else if (optional && !justOne)
                                        need_this_optionnal.push(element)
                                    else{
                                        justOne = true;
                                        need_this_optionnal = []
                                    }
                                }
                                else{
                                    justOne = true;
                                    need_this_optionnal = []
                                }          
                            }
                        });
                    }

                    if (need_this.length !== 0 || need_this_optionnal.length !== 0){
                        if (!obj.data.silent){
                            let exp_message_ia = main.lang.get("format.message_ia");
                            let perm_needed = need_this.concat(need_this_optionnal).join(', ')
                            msg.channel.send(main.lang.get('errors.not_permission', exp_message_ia, perm_needed));
                        }
                        return false;
                    }
                }
            }
        }
    }
}