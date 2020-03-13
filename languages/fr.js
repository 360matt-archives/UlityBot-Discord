function quote (content){ return "``" + content + "``" }

emojis = {
    failed: "<:failed:687719381396094978> | "
}

module.exports.expressions = {
    bot: {
        token_invalid: "Le " + "token".cyan + " dans le fichier de configuration" + " n'est pas correct".red,
        ready: (users, servers) => 'Le bot s\'est '.cyan + 'lancé'.green + ' servant '.cyan + `${users}`.yellow + ' utilisateurs dans '.cyan + `${servers}`.yellow + ' serveurs'.cyan
    },
    global: {
        unknown_command: (command) => emojis.failed + `La commande ${quote(command)} est inconnue`,
        arg_text_required: emojis.failed + 'Un texte devait être précisé !'
    }
}
