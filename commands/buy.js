exports.data = {
    permission: `allow`,
}

exports.run = async (msg) => {
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
            if (msg.buy.isBuyed(msg.member.id, _cmd)){
                msg.no({
                    code: `buy.already_buyed`,
                    args: [
                        _cmd
                    ]
                })
            }
            else if (msg.premium.isEnabled(_cmd) && !msg.premium.isPremium(msg.member.id)){
                msg.no({
                    code: `buy.premium_required`,
                    args: [
                        _cmd
                    ]
                })
            }
            else{
                if (msg.eco.get(msg.member.id) >= msg.buy.getCost(_cmd)){
                    msg.buy(msg.member.id, _cmd)
                    msg.yes({
                        code: `buy.buy`,
                        args: [
                            _cmd,
                            msg.buy.getCost(_cmd)
                        ]
                    })
                    msg.eco.take(msg.buy.getCost(_cmd))
                }
                else{
                    msg.no({
                        code: `buy.no_solde`,
                        args: [
                            _cmd,
                            msg.buy.getCost(_cmd) - msg.eco.get(msg.member.id)
                        ]
                    })
                }
            }
        }
    }
    else{
        if (!msg.ifArg(1)){
            msg.info({
                code: `buy.get_price`
            })
        }
    }
}