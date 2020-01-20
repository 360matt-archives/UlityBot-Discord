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

            tickets: {
                notice_default_title: `Informations Utiles`,
                notice_default_description: (prefix) => `Dans ce ticket, détaillez votre demande.\n
                Apportez au staff les informations nécessaires si besoin (pseudo, motifs, ...).
                Mais jamais vos mots de passes ou informations sensibles :rage:
                ${this.language.tickets.notice_footer(prefix)}`,

                notice_custom_title: `Informations Utiles`,
                notice_custom_description: (prefix, text) => `${text}\n${this.language.tickets.notice_footer(prefix)}`,

                notice_footer: (prefix) => `
                Parlez courtois et avec politesse.
                Le staff se réserve le droit de vous sanctionner pour abus
                (Y compris le staff du bot Ulity)
            
                __**Pour gérer ce ticket**__\n
                \`\`${prefix}close\`\` : pour fermer le ticket\n
                \`\`${prefix}add <@Mention | ID>\`\` : ajouter une personne au ticket\n
                \`\`${prefix}remove <@Mention | ID>\`\` : supprimer les personnes au ticket\n`

            }
        }
    }

    parseCode(_code){
        let final = this.language

        _code.split('.').forEach(i => {
            final = final[i]; 
        })

        return final
    }

    get(_code, args){
        let value = this.parseCode(_code)

        switch (typeof value) {
            case 'function': return value(args);
            default: return value;
        }
    }

    isSet(_code){
        if (this.parseCode(_code) !== `undefined`) return true
        else return false
    }

}