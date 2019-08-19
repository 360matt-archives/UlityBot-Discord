exports.color = (msg, name) => {
    code = {
        "#FF0000": ["rouge", "red"],
        "#FFFF00": ["jaune", "yellow"],
        "#8A2BE2": ["violet", "purple"],
        "#00FF00": ["vert", "green"]
    }

    for (x in code){
        if (code[x].includes(name)) return x
    }

    console.error(`La couleur demandée est inconnue. Veuillez l'indiquer dans l'include color.js`)
    return false
}