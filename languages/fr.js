function quote (content){ return "``" + content + "``" }

emojis = {
    failed: "<:failed:687719381396094978> | "
}

module.exports.expressions = {
    format: {
        single: {
            year: "année",
            month: "mois",
            week: "semaine",
            day: "jour",
            hour: "heure",
            minute: "minute",
            second: "seconde"
        },
        plurial: {
            years: "années",
            months: "mois",
            weeks: "semaines",
            days: "jours",
            hours: "heures",
            minutes: "minutes",
            seconds: "secondes"
        }
    },
    bot: {
        token_invalid: "Le " + "token".cyan + " dans le fichier de configuration" + " n'est pas correct".red,
        ready: (users, servers) => 'Le bot s\'est '.cyan + 'lancé'.green + ' servant '.cyan + `${users}`.yellow + ' utilisateurs dans '.cyan + `${servers}`.yellow + ' serveurs'.cyan
    },
    global: {
        unknown_command: (command) => emojis.failed + `La commande ${quote(command)} est inconnue`,
        arg_text_required: emojis.failed + 'Un texte devait être précisé !'
    },
    errors: {
        dm_insupported: (command) => emojis.failed + `La commande ${quote(command)} n'est pas supportée en DM`,
        not_permission: (command, permission) => emojis.failed + `Vous n'avez pas la permission ${quote(permission)} qui est requise pour la commande ${quote(command)}`,
        ownership_only: (command) => emojis.failed + `La commande ${quote(command)} est réservée au créateur du bot`,
        cooldown_left: (command, left) => emojis.failed + `Vous devez attendre ${quote(left)} avant de réutiliser la commande ${quote(command)}`
    }
}
