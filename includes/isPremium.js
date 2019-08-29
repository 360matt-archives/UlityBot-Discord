exports.isPremium = (msg, id) => {
    if (msg.db.exist(`member.${id}.premium`)){
        if (msg.db.get(`member.${id}.premium`)){
            return true
        }
    }

    return false
}