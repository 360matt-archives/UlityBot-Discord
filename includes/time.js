module.exports = class {
    withDate (_date){
        this.type = `date`
        this.value = _date
        return this
    }

    withTimestamp (_ts){
        this.type = `ts`
        this.value = _ts
        return this
    }

    withSeconds (_s){
        this.type = `s`
        this.value = _s
        return this
    }

    before (){
        this.relative = "before"
        return this
    }

    after (){
        this.relative = "after"
        return this
    }

    initsec () {
        var now = new Date()
        var sec

        if (this.type == `s`)
            sec = this.value
        else if (this.type == `ts`)
            if (this.relative == `before`)
                sec = Math.round((new Date(this.value) - now)/1000)
            else
                sec = Math.round((now - new Date(this.value))/1000)
        else
            if (this.relative == `before`)
                sec = Math.round(Number (Number(new Date(this.value)) - Number(now))/1000)
            else
                sec = Math.round(Number (Number(now) - Number(new Date(this.value)))/1000)

        return sec;
    }

    exec () {
        if (this.relative == null || this.type == null || this.value == null){
            let errHandle = require(`../error`)
            errHandle(`time.js (ligne 53) `.yellow + `:` + ` class mal initialisée`.red)
            return;
        }

        var sec = this.initsec()

        let y = Math.floor(sec/(60*60*24*7*365))
        sec = sec - (y*60*60*24*7*365)

        let mo = Math.floor(sec/(60*60*24*31))
        sec = sec - (mo*60*60*24*31)

        let w = Math.floor(sec/(60*60*24*7))
        sec = sec - (w*60*60*24*7)

        let d = Math.floor(sec/(60*60*24))
        sec = sec - (d*60*60*24)

        let h = Math.floor(sec/(60*60))
        sec = sec - (h*60*60)

        let mins = Math.floor(sec/60)
        sec = sec - mins*60

        const obj = {
            0: {
                name: "année",
                value: y
            },
            1: {
                name: "mois",
                value: mo
            },
            2: {
                name: "semaine",
                value: w
            },
            3: {
                name: "jour",
                value: d
            },
            4: {
                name: "heure",
                value: h
            },
            5: {
                name: "minute",
                value: mins
            },
            6: {
                name: "seconde",
                value: sec
            }
        }

        var text = ""
        var i = -1
        
        for (let x in obj){
            i++
            if (obj[i].value != 0){
                if (text != ``)
                    text = text.concat(`, `)
                if (obj[i].name == `mois`)
                    text = text.concat(`${obj[i].value} mois`)
                else if (obj[i].value == 1)
                    text = text.concat(`1 ${obj[i].name}`)
                else
                    text = text.concat(`${obj[i].value} ${obj[i].name}s`)
            }
        }

        if (text == '')
            text = `0 seconde`

        return text;

    }
}