exports.color = async (msg, color) => {

    switch(color){
        case `rouge`: return `#FF0000`
        case `vert`: return `#00FF00`
        case `jaune`: return `#FFCE42`
        case `violet`: return `#8A2BE2`
    }
    /* FR */

    switch(color){
        case `red`: return `#FF0000`
        case `green`: return `#00FF00`
        case `yellow`: return `#FFCE42`
        case `purple`: return `#8A2BE2`
    }
    /* EN */


    console.error(`La couleur demandée est inconnue. Veuillez l'indiquer manuellement`); 
    return color
}