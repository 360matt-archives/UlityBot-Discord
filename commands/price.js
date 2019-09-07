exports.data = {
    permission: `allow`,
    aliases: [`prix`]
}

exports.run = (msg) => {
    if (msg.ifArg.err(1, `command`)){
        _cmd = msg.resolve(msg.args[0], `commande`).name

        if (!msg.buy.isEnabled(_cmd)){
            msg.no({
                code: `buy.not_enabled`,
                args: [
                    _cmd
                ]
            })
        }
        else{
            msg.info({
                code: `buy.price`,
                args: [
                    _cmd,
                    msg.buy.getCost(_cmd)
                ]
            })
        }
    }
}