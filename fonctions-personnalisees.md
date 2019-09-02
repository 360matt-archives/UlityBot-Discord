---
description: >-
  Afin de simplifier le développement du bot nous avons créé nos propres
  fonctions
---

# Fonctions personnalisées

* **msg.handler** contient l'export de la commande \(run et datas\)
* **msg.cooldown.verify\(\)** renvoie un booléen si le cooldown global est respecté
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

* **msg.lang\("Terme", \[args\]\)** renvoie une expression du fichier de langue
* **msg.emojis\(\)** renvoie le formatage émojis ou son ID:

```javascript
msg.emojis("nom de l'émojis", false)
/* true: renvoie seulement l'ID de l'emojis */
/* false: renvoie le formatage de l'emojis */
```

* **msg.time\(\)** modifie une durée en format litteraire ou renvoie le timestamp en secondes:

```javascript
msg.time({
    type: "s" | "ms" | "timestamp" | undefined /* défaut: "s" */
    time: NOMBRE /* requis sauf si type = "timestamp"
})
```

* **msg.eco.give\(\)** incrémente le solde d'une personne:
* **msg.eco.take\(\)** décrémente le solde d'une personne:
* **msg.eco.set\(\)** défini le solde d'une personne:
* **msg.eco.reset\(\)** supprime le solde d'une personne:

```javascript
msg.eco.give(50, `xxxxxxxxxxxxx ID` | object)
/* ajoute 50 au solde de l'auteur du message ou personne précisé */

msg.eco.take(50, `xxxxxxxxxxxxx ID` | object)
/* retire 50 du solde de l'auteur du message ou personne précisé */

msg.eco.set(50, `xxxxxxxxxxxxx ID` | object)
/* defini le solde à 50 de l'auteur du message ou personne précisé */

msg.eco.reset(`xxxxxxxxxxxxx ID` | object)
/* supprime le code de la personne de la base de donnée */
```

* **msg.ifArg\(\)** renvoie _true_ ou _false_ si l'argument existe et éventuellement s'il est de bon type:
* **msg.ifArg.err\(\)** même effet et syntaxe que celui d'au dessus mais en envoyant une erreur dans le salon:

```javascript
msg.ifArg(arg1, arg2)
/* arg1: numéro de l'argument commençant par 1. */
/* arg2 (optionnel):   -> channel, salon,
                       -> user, member, membre,
                       -> guild, server, serveur,
                       -> emojis
*/
```

**msg.resolve\(\)** récupère l'object d'un salon, membre, serveur ou emojis par une ID:

```javascript
msg.ifArg(arg1, arg2)
/* arg1: ID. */
/* arg2 (optionnel):   -> channel, salon,
                       -> user, member, membre,
                       -> guild, server, serveur,
                       -> emojis
*/
```

* **msg.toid\(\)** renvoie l'id d'une mention utilisateur, rôle ou channel:

```javascript
msg.toid( `xxxxxxxxxxxxx` )
```

* 
