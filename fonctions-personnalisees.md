---
description: >-
  Afin de simplifier le développement du bot nous avons créé nos propres
  fonctions
---

# Fonctions personnalisées

* **msg.handler** contient l'export de la commande \(run et datas\)
* **msg.cooldown.verify\(\)** renvoie un booléan si le cooldown global est respecté
* **msg.cooldown.command\(\)** renvoie un booléan si le cooldown de la commande entrée est respecté
* **msg.no\(\)**, **msg.yes\(\)**, **msg.info\(\)**, **msg.help\(\)** envoient des messages:



```javascript
msg.yes({
    code: "code dans le fichier de langue", /* P */
    single: "message seul", /* P */
    title: "titre de l'embed", /* P */
    description: "description de l'embed", /* P */
    
    color: msg.color(`vert`),
    footer: true | false | `footer personnalisé`,
    author: `xxxxxxxxxxxxx ID` | object,
    
    
    
    
})
```

