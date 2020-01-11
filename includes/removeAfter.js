module.exports = (msg, time = 5) => {
    setTimeout(() => {
        msg.delete().catch((e) => {})
    }, time*1000)
}