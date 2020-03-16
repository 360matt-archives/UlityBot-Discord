function quote (content){ return "``" + content + "``" }

emojis = {
    failed: "<:failed:687719381396094978> | ",
    success: "<:success:688789646012055711> | ",
    arrow_right: "<a:arrow_right:688777347259826189>",
    rage: "<a:rage:688781404573663296>",
    party: "<a:party:688785528514281506>"
}

module.exports.expressions = {
    emojis: emojis,
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
        ready: (users, servers) => 'Le bot s\'est '.cyan + 'lancé'.green + ' servant '.cyan + `${users}`.yellow + ' utilisateurs dans '.cyan + `${servers}`.yellow + ' serveurs'.cyan,
        command_executed: (user_tag, user_id, command, guild_name = "DM", guild_id = "0") => `${user_tag} `.magenta + `(${user_id}) `.grey + `[${guild_name} `.magenta + `(${guild_id})]`.grey + ' a éxécuté la commande '.cyan + `${command}`.yellow,
        command_check_failed: {
            dm_insupported: '  --> refusé: DM non supporté'.red,
            not_permission: (flag) => `  --> Refusé: N'a pas la permission`.red + `${flag}`.yellow,
            owner_only: '  --> Refusé: Commande réservée aux propriétaires'.red,
            cooldown_not_reached: (time_remaining) => '  --> Refusé: cooldown non atteint '.red + `${time_remaining}`.yellow
        }
    },
    global: {
        unknown_command: (command) => emojis.failed + `La commande ${quote(command)} est inconnue`,
        arg_text_required: emojis.failed + 'Un texte devait être précisé !',
        unknown_reason: "une raison indéterminée"
    },
    errors: {
        dm_insupported: (command) => emojis.failed + `La commande ${quote(command)} n'est pas supportée en DM`,
        not_permission: (command, permission) => emojis.failed + `Vous n'avez pas la permission ${quote(permission)} qui est requise pour la commande ${quote(command)}`,
        ownership_only: (command) => emojis.failed + `La commande ${quote(command)} est réservée au créateur du bot`,
        cooldown_left: (command, left) => emojis.failed + `Vous devez attendre ${quote(left)} avant de réutiliser la commande ${quote(command)}`
    },
    commands: {
        ban: {
            syntax: (command) => emojis.failed + `La syntaxe de la commande ${quote(command)} ${emojis.arrow_right} ${quote('<utilisateur> [<raison du ban>]')}`,
            cant_ban: (username) => emojis.failed + `Impossible de bannir ${quote(username)}, || est-il un dieu ? ||`,
            banned_server: (id, staff_id) => emojis.success + `<@${id}> vient d'être banni par <@${staff_id}>`,
            banned_server_with_reason: (id, staff_id, reason) => `Ohhh :open_mouth:, <@${id}> vient d'être banni par <@${staff_id}>\n**Raison:** ${quote(reason)}`,
            ban_yourself: (id) => `<@${id}> tu veux que je te ban mai je suis trop fatigué, t'as juste à quitter le serveur ${quote("¯\\_(ツ)_/¯")}`,
            cant_ban_colleague: (target_id, sender_id) => emojis.failed + `<@${sender_id}>, impossible de bannir ton collègue <@${target_id}> Vous êtres trop mignon ensemble`,
            cant_ban_bot_owner: (id) => emojis.failed + `Non, <@${id}> est un dieu. c'est mon propriétaire, c'est ma viiiiiie :heart:`
        }
    }
}
