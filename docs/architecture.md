# Architecture

---

## À quoi ça sert ?

L'architecture de l'api sert a :

- Si retrouver plus simplement
- Permetre une bonne lisibiliter
- Faire des modification sans perdre du temps a retrouver ou est la fonction que l'on cherche
- Permet d'ajouter des etapes en plus entre les composant sans rien casser

---

## Comment ça marche ?

C'est simple 1 dossier principal et des dossier avec fichier avec des nom explicite

---

### Exemple

```bash
.
├── docs
│   └── # La documentation de l'api
├── data
│   ├── # Les different fichiers qui on un rapport avec la BDD
│   └── sqitch
│       └── # Tout ce qui concerne le versioning de la BDD
└── api
    ├── index.js # La base du server
    ├── logs # Tout les retour d'erreur
    ├── tests # Les test qui sont realiser sur l"api
    ├── public
    │   ├── css # Les fichiers css static
    │   ├── js # Les fichiers js static
    │   └── images # Les images static
    └── app
        ├── middlewares
        │   └── # Premiere etape de verification agit en 1er
        ├── routers
        │   └── # Indique les route disponible sur l'api
        ├── service
        │   └── # Les fichier avec des fonction utile sur toute l'api
        ├── controllers
        │   └── # Les fichier qui permete le plus gros niveau de verification
        ├── models
        │   └── # Les fichier qui comunique directement avec la BDD
        └── views
            └── # Les fichier ejs/pug static
```

---
