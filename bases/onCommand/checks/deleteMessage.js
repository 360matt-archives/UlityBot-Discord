module.exports = (obj, msg, command, args) => {
    if (!msg.deleted)
        msg.delete()
}