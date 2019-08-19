exports.enabled = true

exports.get = (msg, term, args) => {
    /* principaux emojis: */
    success = msg.emojis(`success`)
    failed = msg.emojis(`failed`)




    const language = {
        cooldown: {
            global: {
                title: `${failed} Soufflez dans ce sac`,
                description: (time) => `Vous devez attentre [[${time}]] d'intervale avant d'utiliser de nouveau une commande`,
                single: (time) => `Décompressez-vous attendez [[${time}]] d'intervale entre chaque utilisation des commandes`
            },
            command: {
                title: `${failed} Soufflez dans ce sac`,
                description: (time) => `Vous devez attentre [[${time}]] d'intervale avant d'utiliser de nouveau cette commande`,
                single: (time, command) => `La [[${command}]] est limitée à [[${time}]] d'intervale entre chaque utilisation`
            }
        },
        no_perm: {
            title: `Vous n'avez la permission requise`,
            description: `Il me semble que tu n'ais pas la permission pour réaliser ce miracle`,
            single: `Vous n'avez pas la permission d'effectuer cela`
        },
        ping: {
            loading: {
                title: `Calcul du ping en cours`,
                description: `Nous déterminons le ping du bot en calculant la vitesse d'édition de message`,
                single: `Nous déterminons le ping du bot en calculant la vitesse d'édition d'un message`
            },
            show: {
                title: `Ping du bot`,
                description: (time, ping) => `Le bot met en moyenne [[${time} ms]] pour envoyer un message\n\nLe ping de l'API Discord est en moyenne [[${ping} ms]]`,
                single: (time, ping) => `Le bot met en moyenne [[${time} ms]] pour envoyer un message et le ping de l'API Discord est en moyenne [[${ping} ms]]`
            }
        },
        eco: {
            balance: {
                title: `Votre solde actuel`,
                description: (money) => `Vous possédez [[${money}]] Ulits`,
                single: (money) => `Solde : Vous possédez [[${money}]] Ulits`
            }
        }



















    }

    var _term
    var value 

    _term = term.split(`.`)
    value = language

    for (i = 0; i < _term.length; i++) {
        if (typeof value[_term[i]] !== `undefined`){
            value = value[_term[i]]
        }
        else{
            console.error(`le terme "${term}" n'est pas défini`)
            return `undefined`
        }
    }

    switch (typeof value) {
        case 'function': 
            for (var i = 0; i < args.length; i++) {
                value = value.bind(null, args[i])
            }
            value = value()

            while(value.includes('[[') || value.includes(']]')){
                value = value.replace('\[\[', '``');
                value = value.replace('\]\]', '``');
            }

            return value
        default: return value;
    }
}