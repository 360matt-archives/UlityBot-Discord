exports.execute = (client) => {
    const show = [ // custom
        `Ulity v1.0 - ${client.guilds.size} serveurs - ${client.users.size} utilisateurs`, 
        `Invite moi sur ton serveur dès maintenant`,
        `bot développé avec passion`
    ];
    
    setInterval(() => {
        const index = Math.floor(Math.random() * (show.length - 1));
        client.user.setActivity(show[index], { type: "STREAMING", url: "https://www.twitch.tv/UlityMC" });
    }, 5000);
    
    client.guilds.forEach(m => {
        console.log(`-> ${m.name} (${m.members.size} utilisateurs) [ID: ${m.id}]`)
    });
    console.log(`Bot charge avec succes sous le nom de ${client.user.tag}\nDéployé dans ${client.guilds.size} serveurs\nServant ${client.users.size} utilisateurs`); // custom
}