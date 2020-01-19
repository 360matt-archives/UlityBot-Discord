module.exports = class {
    constructor(){
        this.language = {
            tickets: {
                ticket_notice_title: `Informations Utiles`,
                ticket_notice_description: (prefix) => `Dans ce ticket, détaillez votre demande.\n
                Apportez au staff les informations nécessaires si besoin (pseudo, motifs, ...).
                Mais jamais vos mots de passes ou informations sensibles :rage:

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
            if (typeof final[i] !== `undefined`) final = final[i]
            else return 'undefined'
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