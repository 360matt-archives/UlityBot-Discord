module.exports = class {

    constructor (client, msg){
        this.client = client
        this.msg = msg
    }

    isSet (index, type = null){
        if (!this.msg.args[index])
            return false

        if (type)
            if (!this.isType(index, type))
                return false

        return true
    }

    isSet_err(index, type = null) {
        if (!this.msg.args[index]){
            this.msg.post.exec({code: 'global.no_arg', args: index+1})
            return false
        }

        if (type)
            if (!this.isType_err(index, type))
                return false
        
        return true

    }

    isType (index, type){
        switch(type){
            case 'number':
                return !isNaN(this.msg.args[index])
            case 'channel':
                if (this.client.channels.has(this.msg.args[index]))
                    return true
                if (this.client.channels.has(this.decode(this.msg.args[index])))
                    return true
                break
            case 'user':
            case 'member':
                if (this.client.users.has(this.msg.args[index]))
                    return true
                if (this.client.users.has(this.decode(this.msg.args[index])))
                    return true
                break
            case 'role':
                if (this.msg.roles.has(this.msg.args[index]))
                    return true
                if (this.msg.roles.has(this.decode(this.msg.args[index])))
                    return true
                break
            case 'guild':
            case 'server':
                return this.client.guilds.has(this.msg.args[index])
            default:
                return false
        }
    }

    isType_err(index, type) {
        let res = this.isType(index, type)

        if (!res){
            if (this.msg.lang.isSet(`types.${type}`))
                type = this.msg.lang.get(`types.${type}`)
            else
                type = this.msg.lang.get('types.unknown')
            
            this.msg.post.exec({code: 'global.arg_invalid_type', args: [this.msg.args[index], type]})

            return false
        }

        return res
    }

    getType (index, type) {
        switch(type){
            case 'number':
                return !isNaN(this.msg.args[index])
            case 'channel':
                if (this.client.channels.has(this.msg.args[index]))
                    return this.client.channels.resolve(this.msg.args[index])
                if (this.client.channels.has(this.decode(this.msg.args[index])))
                    return this.client.channels.resolve(this.decode(this.msg.args[index]))
                break
            case 'user':
            case 'member':
                if (this.client.users.has(this.msg.args[index]))
                    return this.client.users.resolve(this.msg.args[index])
                if (this.client.users.has(this.decode(this.msg.args[index])))
                    return this.client.users.resolve(this.decode(this.msg.args[index]))
                break
            case 'role':
                if (this.client.roles.has(this.msg.args[index]))
                    return this.client.roles.resolve(this.msg.args[index])
                if (this.client.roles.has(this.decode(this.msg.args[index])))
                    return this.client.roles.resolve(this.decode(this.msg.args[index]))
                break
            case 'guild':
            case 'server':
                if (this.client.guilds.has(this.msg.args[index]))
                    return this.client.guilds.resolve(this.msg.args[index])
                break
            default:
                return false
        }
        return false

    }

    decode (mention){
        if (mention.startsWith('<@'))
            return mention.match(/^<@!?(\d+)>$/)[1]
        else if (mention.startsWith('<#'))
            return mention.match(/^<#!?(\d+)>$/)[1]
        else if (mention.startsWith('<@&'))
            return mention.match(/^<@&!?(\d+)>$/)[1]

    }
}