module.exports = class {
    constructor(){
        this.language = {
            date: {
                year: 'année',
                years: 'années',
                month: 'mois',
                months: 'mois',
                week: 'semaine',
                weeks: 'semaines',
                day: 'day',
                days: 'days',
                second: 'seconde',
                seconds: 'secondes'
            },

            types: {
                number: 'nombre',
                channel: 'salon',
                user: 'utilisateur',
                member: 'membre',
                role: 'rôle',
                guild: 'guilde',
                server: 'serveur'
            },

            global: {
                no_arg_single: (number) => `L'argument \`\`n°${number}\`\` n'existe pas et doit être spécifié`,
                arg_invalid_type_single: (arg, type) => `L'argument \`\`${arg}\`\` devrait être de type \`\`${type}\`\``,
                error: 'Il s\'est produit une erreur :/ bip boup !'
            },

            tickets: {
                notice_default_title: 'Informations Utiles',
                notice_default_description: (prefix) => `Dans ce ticket, détaillez votre demande.\n
                Apportez au staff les informations nécessaires si besoin (pseudo, motifs, ...).
                Mais jamais vos mots de passes ou informations sensibles :rage:
                ${this.language.tickets.notice_footer(prefix)}`,

                notice_custom_title: 'Informations Utiles',
                notice_custom_description: (prefix, text) => `${text}\n${this.language.tickets.notice_footer(prefix)}`,

                notice_footer: (prefix) => `
                Parlez courtois et avec politesse.
                Le staff se réserve le droit de vous sanctionner pour abus
                (Y compris le staff du bot Ulity)
            
                __**Pour gérer ce ticket**__\n
                \`\`${prefix}ticket-close\`\` : pour fermer le ticket\n
                \`\`${prefix}ticket-add <@Mention | ID>\`\` : ajouter une personne au ticket\n
                \`\`${prefix}ticket-remove <@Mention | ID>\`\` : supprimer les personnes au ticket\n`,



                already_created_single: (id) => `Ton ticket existe déjà, il se trouve là: <#${id}>, mais si il est là ! Rooooooh`,
                created_single: (id) => `Ooooh :open_mouth: un nouveau ticket viens d'apparaitre: <#${id}>`,
                deleted_single: 'Ooh, je crois qu\'on l\'a perdu. Ah non, c\'est juste toi qu\'a supprimé le ticket :open_mouth:',
                added_single: (id) => `Plus on est de fou et plus on rit, vous avez ajouté <@${id}> au ticket`,
                added_notification_single: (id) => `Ajout de <@${id}> au ticket !`

            }
        }
    }

    parseCode(_code){
        let final = this.language

        _code.split('.').forEach(i => {
            try{
                final = final[i];
            }
            catch(e){
                final = undefined
            }
        })

        return final
    }

    get(_code, args){
        let value = this.parseCode(_code)

        switch (typeof value) {
            case 'function':
                return value(...args)
            default: 
                return value
        }
    }

    isSet(_code){
        if (typeof this.parseCode(_code) !== `undefined`) return true
        else return false
    }

}