exports.enabled = true

exports.get = (msg, term, args) => {
    /* principaux emojis: */
    success = msg.emojis(`success`)
    failed = msg.emojis(`failed`)




    const language = {
        general: {
            expressions: {
                channel: "salon",
                emojis: "emojis",
                server: "serveur",
                member: "membre",
                message: "message",
                unknown: "inconnu"
            },
            missing_arg: {
                basic: {
                    title: `${failed} Missing argument`,
                    description: (num) => `The command cannot be executed without the following argument [[n°${num}]] It doesn't exist.`,
                    single: (num) => `The command cannot be executed without the following argument [[n°${num}]] It doesn't exist.`
                },
                type: {
                    title: `${failed} Wrong argument type`,
                    description: (num, type) => `The argument [[n°${num}]] is invalid. It should evocate a [[${type}]]`,
                    single: (num, type) => `The argument [[n°${num}]] isn't valid. It should evocate a [[${type}]]`
                }
            }
        },
        cooldown: {
            global: {
                title: `${failed} CALM DOWN`,
                description: (time) => `You have to wait [[${time}]] before using again the bot.`,
                single: (time) => `Calm down and wait [[${time}]] before next usage.`
            },
            command: {
                title: `${failed} Hey, command's busy, man!`,
                description: (time) => `You have to wait [[${time}]] before using again this command`,
                single: (time, command) => `The [[${command}]] is limited at [[${time}]] of waiting time between each usage.`
            }
        },
        no_perm: {
            title: `You don't have the permission`,
            description: `This miracle isn't in your capacity. Well, you're dumb trying anyway.`,
            single: `You can't do that.`
        },
        ping: {
            loading: {
                title: `Ping calculating`,
                description: `Calculating bot's ping by editing message`,
                single: `Calculating bot's ping by editing message`
            },
            show: {
                title: `Bot's ping`,
                description: (time, ping) => `The bot use around [[${time} ms]] to send a message\n\nThe Discord API's ping is around [[${ping} ms]]`,
                single: (time, ping) => `The bot use around [[${time} ms]] to send a message and the Discord API's ping is around [[${ping} ms]]`
            }
        },
        eco: {
            balance: {
                title: `Your actual balance`,
                description: (money) => `You have [[${money}]] Ulits`,
                single: (money) => `Balance : You have [[${money}]] Ulits`
            },
            daily: {
                title: `Daily reward!`,
                description: (money) => `You've just got [[${money}]] Ulits ! Come back tomorrow.`,
                single: (money) => `You've just got [[${money}]] Ulits ! You should come back tommorow.` 
            },
            add: {
                title: `Adding money (dawn, let's be rich)`,
                description: (added, id, result) => `You have added [[${added}]] Ulits to <@${id}>.\nThis user have now [[${result}]] Ulits !`,
                single: (added, id, result) => `You have given [[${added}]] Ulits to <@${id}>.\nThis user have now [[${result}]] Ulits !` 
            },
            rem: {
                title: `Removing money (dawn, let's be poor. Wait no)`,
                description: (added, id, result) => `You've just removed [[${added}]] Ulits to <@${id}>.\nThis user have now [[${result}]] Ulits !`,
                single: (added, id, result) => `You've just removed [[${added}]] Ulits to <@${id}>.\nThis user have now [[${result}]] Ulits !` 
            },
            set: {
                title: `Money's definition`,
                description: (added, id) => `<@${id}> have now [[${added}]] Ulits.`,
                single: (added, id) => `<@${id}> have now [[${added}]] Ulits.` 
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