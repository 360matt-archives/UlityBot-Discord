module.exports = class {
    constructor(){
        this.language = {
            test: (a) => `aa ${a}`
        }
    }

    get(_code, args){
        let value = this.language[_code]
        switch (typeof value) {
            case 'function': return value(args);
            default: return value;
        }
    }

}