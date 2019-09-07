exports.enabled = true

exports.get = (msg, term, args) => {
    /* principaux emojis: */
    success = msg.emojis(`success`)
    failed = msg.emojis(`failed`)
    info = msg.emojis(`info`)




    const language = {
        general: {
            expressions: {
                channel: "salon",
                emojis: "emojis",
                server: "serveur",
                member: "membre",
                message: "message",
                unknown: "inconnu",
                command: "commande"
            },
            missing_arg: {
                basic: {
                    title: `${failed} Il manque un argument`,
                    description: (num) => `La commande ne peut pas s'effectuer sans l'argument [[n°${num}]] qui n'existe pas.`,
                    single: (num) => `La commande ne peut pas s'effectuer sans l'argument [[n°${num}]] qui n'existe pas.`
                },
                type: {
                    title: `${failed} Un argument est de mauvais type`,
                    description: (num, type) => `L'argument [[n°${num}]] est invalide. Il devrait évoquer un(e) [[${type}]]`,
                    single: (num, type) => `L'argument [[n°${num}]] est invalide. Il devrait évoquer un(e) [[${type}]]`
                }
            },
            buy: {
                no_buyed: {
                    title: `${failed} L'utilisation de cette commande est payante`,
                    description: (command, cost) => `Oh non, \nLa commande [[${command}]] requiert un achat de [[${cost} Ulits]] pour être utilisée\nEh oui, la vie est parfoie injuste`,
                    single: (command, cost) => `La commande [[${command}]] requiert un achat de [[${cost} Ulits]] pour être utilisée`
                }
            },
            premium: {
                no_premium: {
                    title: `${failed} Cette commande est réservée aux premiums`,
                    description: (command) => `Oh non, \nLa commande [[${command}]] requiert un achat de la fonctionnalité premium pour être utilisée\nMais en étant premium vous pouvez bénéficier de superbes avantages.`,
                    single: (command) => `La commande [[${command}]] requiert un achat de la fonctionnalité premium pour être utilisée.`
                }
            }
        },
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
            },
            daily: {
                title: `Récompense du jour`,
                description: (money) => `Vous venez de reçevoir [[${money}]] Ulits ! Revenez demain.`,
                single: (money) => `Vous venez de reçevoir [[${money}]] Ulits ! Revenez demain.` 
            },
            add: {
                title: `Ajout de money`,
                description: (added, id, result) => `Vous venez d'ajouter [[${added}]] Ulits à <@${id}>.\nCet utilisateur a désormais [[${result}]] Ulits !`,
                single: (added, id, result) => `Vous venez d'ajouter [[${added}]] Ulits à <@${id}>.\nCet utilisateur a désormais [[${result}]] Ulits !` 
            },
            rem: {
                title: `Retrait de money`,
                description: (added, id, result) => `Vous venez de retirer [[${added}]] Ulits à <@${id}>.\nCet utilisateur a désormais [[${result}]] Ulits !`,
                single: (added, id, result) => `Vous venez de retirer [[${added}]] Ulits à <@${id}>.\nCet utilisateur a désormais [[${result}]] Ulits !` 
            },
            set: {
                title: `Définition de money`,
                description: (added, id) => `Vous venez de mettre la money de <@${id}> à [[${added}]] Ulits.`,
                single: (added, id) => `Vous venez de mettre la money de <@${id}> à [[${added}]] Ulits.` 
            }
        },
        buy: {
            not_enabled: {
                title: `${failed} Cette commande n'est pas payante`,
                description: (command) => `La commande [[${command}]] n'est pas payante. Inutile de payer :wink:`,
                single: (command) => `La commande [[${command}]] n'est pas payante. Inutile de payer :wink:`
            },
            already_buyed: {
                title: `${failed} Cette commande a déjà été achetée`,
                description: (command) => `Vous avez déjà acheté la commande [[${command}]]`,
                single: (command) => `Vous avez déjà acheté la commande [[${command}]]`
            },
            buy: {
                title: `${success} Dépense effectuée`,
                description: (command) => `Vous pouvez désormais utiliser la commande [[${command}]]`,
                single: (command) => `Vous pouvez désormais utiliser la commande [[${command}]]`
            },
            no_solde: {
                title: `${failed} Vous n'avez pas assez d'argent`,
                description: (command, cost) => `Il vous manque [[${cost} Ulits]] pour acheter la commander [[${command}]]`,
                single: (command, cost) => `Il vous manque [[${cost} Ulits]] pour acheter la commander [[${command}]]`
            },
            get_price: {
                title: `${info} Obtenir le prix d'une commande`,
                description: `Vous pouvez utiliser la commande [[price]] pour savoir combien côute l'achat d'une commande`,
                single: `Vous pouvez utiliser la commande [[price]] pour savoir combien côute l'achat d'une commande`
            },
            premium_required: {
                title: `${failed} Achat de la commande pour les membres premium uniquement`,
                description: (command) => `Vous n'avez pas les privilèges premium et la commande [[${command}]] exige ces privilèges pour ensuite effectuer l'achat`,
                single: (command) => `Vous n'avez pas les privilèges premium et la commande [[${command}]] exige ces privilèges pour ensuite effectuer l'achat`               
            },
            price: {
                title: `${info} Prix d'achat de la commande`,
                description: (command, cost) => `La commande [[${command}]] coûte [[${cost}]] Ulits lors de l'achat`,
                single: (command, cost) => `La commande [[${command}]] coûte [[${cost}]] Ulits lors de l'achat`               
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
            return false
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
        default:
            while(value.includes('[[') || value.includes(']]')){
                value = value.replace('\[\[', '``');
                value = value.replace('\]\]', '``');
            }
            return value;
    }
}