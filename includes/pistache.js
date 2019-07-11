const fetch = require(`node-fetch`)
const _server = `https://pistache.ulity.fr/`

async function IsOnline () {
    _response = await fetch(`${_server}?is_online`)
    .then(res => res.text())

    if (_response === `yeah`) return true
}

/**
 * Pistache est un service de cache de ressources sur ses propres serveurs
 * @param {string} url l'url d'origine de la ressource
 * @returns {string|Function} url de la ressource mise en cache sur nos serveurs
*/

exports.cache = async (_url) => {
    if (IsOnline()){
        return await fetch(`${_server}?geturl&link=${_url}`)
        .then(res => res.text())
    }
    else{
        console.error(`Nous sommes temporairement indisponible\nNous avons retourné le lien de la ressource d'origine.`)
        return _url
    }
}