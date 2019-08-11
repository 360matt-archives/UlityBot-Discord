exports.color = (msg, cname) => {

    switch(cname){
        case `rouge`: return 16711680
        case `vert`: return 65280
        case `jaune`: return 16764482
        case `violet`: return 9055202
    }
    /* FR */

    switch(cname){
        case `red`: return 16711680
        case `green`: return 65280
        case `yellow`: return 16764482
        case `purple`: return 9055202
    }
    /* EN */



        console.error(`La couleur demandée est inconnue. Veuillez l'indiquer manuellement`)
        return false
}