module.exports = class {

    constructor (_client) {
        this.client = _client
        this.lang = new (require(`./lang.js`))(_client)
    }

    withLang(_lang){
        this.lang = new (require(`./lang.js`))(client).withLang(_lang)
    }

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
        let now = new Date()
        let sec

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
            console.error(` class mal initialisée`.red)
            return;
        }

        let sec = this.initsec()

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
                single: this.lang.get('date.year'),
                plurial: this.lang.get('date.years'),
                value: y
            },
            1: {
                single: this.lang.get('date.month'),
                plurial: this.lang.get('date.months'),
                value: mo
            },
            2: {
                single: this.lang.get('date.week'),
                plurial: this.lang.get('date.weeks'),
                value: w
            },
            3: {
                single: this.lang.get('date.day'),
                plurial: this.lang.get('date.days'),
                value: d
            },
            4: {
                single: this.lang.get('date.hour'),
                plurial: this.lang.get('date.hours'),
                value: h
            },
            5: {
                single: this.lang.get('date.minute'),
                plurial: this.lang.get('date.minutes'),
                value: mins
            },
            6: {
                single: this.lang.get('date.second'),
                plurial: this.lang.get('date.seconds'),
                value: sec
            }
        }

        let text = ""
        let i = -1
        
        for (let x in obj){
            i++
            if (obj[i].value != 0){
                if (text != '')
                    text = text.concat(', ')
                else if (obj[i].value == 1)
                    text = text.concat(`1 ${obj[i].single}`)
                else
                    text = text.concat(`${obj[i].value} ${obj[i].plurial}`)
            }
        }

        if (text == '')
            text = `0 ${this.lang.get('date.second')}`

        return text;

    }
}