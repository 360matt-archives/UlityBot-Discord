exports.permission = `deny`

exports.run = async (msg) => {
    _oldTime = new Date
    n = await msg.info(`ping.loading`)
    msg.info(`ping.show`, Number(new Date) - Number(_oldTime), 'a', {"message": n, "action": "edit"})
}