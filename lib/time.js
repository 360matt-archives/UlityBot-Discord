const main = require('../index');
const moment = require('moment');

module.exports.textual = (seconds) => {
    let final = "", duration = moment.duration(seconds, "milliseconds");

    let loop = {
        0: {plurial: "plurial.years", single: "single.year", value: duration.years()},
        1: {plurial: "plurial.months", single: "single.month", value: duration.months()},
        2: {plurial: "plurial.weeks", single: "single.week", value: duration.weeks()},
        3: {plurial: "plurial.hours", single: "single.hour", value: duration.hours()},
        4: {plurial: "plurial.minutes", single: "single.minute", value: duration.minutes()},
        5: {plurial: "plurial.seconds", single: "single.second", value: duration.seconds()}
    }

    for (x in loop)
        if (loop[x]["value"] > 0){
            let z = loop[x];
            final += `${z.value} ${main.lang.get(`format.${z.value > 1 ? z.plurial : z.single}`)}, `
        }

    if (final == '')
        return `1 ${main.lang.get(`format.single.second`)}`;
    else
        return (final.endsWith(', ') ? final.slice(0, -2) : final).trim();
}