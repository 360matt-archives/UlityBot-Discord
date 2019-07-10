exports.check = (msg, data = []) => {

    if (typeof data.id == `undefined`) data.id = msg.member.id
    if (typeof data.code == `undefined`) data.code = msg.handler.permission
    if (typeof data.error == `undefined`) data.error = false
    data.member = msg.guild.members.get(data.id)

    if (msg.config.owners.includes(data.id)) return true

    wait = false
    if (data.code == `allow`) return true
    if (data.code == `deny`) wait = true

    if (!wait) if (data.member.hasPermission(data.code)) return true

    if (data.error){
        msg.no(`no_perm`)
    }

    return false




}