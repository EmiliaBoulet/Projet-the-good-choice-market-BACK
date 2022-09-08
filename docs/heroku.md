# Deploiement sur Heroku

---

## Mise en place

Pour avoir un environement viable sur Heroku

Minimum

- Verifier que tous les fichier sont conforme au resultat attendu
- Pas de bug en local

Obligatoire ⚠️

- La connection a la base de donnée est connecter a la BDD sur Heroku
- Le script **start** est ecrit et corespond bien au fichier cible

---

## Creation de l'app sur Heroku

- *New => Create new-app* ( puis suivre les instruction )

- *Settings => buildpacks => nodejs* /  ou / *heroku buildpacks:set heroku/nodejs* ( pour mettre en place l'environement de l'app )

- *Ressources => Add-ons => heroku Postgres* / ou / *heroku addons:create heroku-postgresql:hobby-dev* ( pour mettre en place la BDD )
  - Cliquer sur la *heroku Postgres* pour acceder au proprieter de la BDD
  - Recuperer la variable d'environnement **DATABASE_URL** dans *Settings => Views Credentials... => URI*

---

## Connection

- instalation du CLI en local si ce n'est pas fait

Dans le terminal

```bash
# Connecter sont repo local a heroku
heroku login
```

```bash
# Ajouter le remote d'heroku
heroku git:remote -a le-nom-de-votre-app
# Verifier que le remote a ete ajouter
git remote -v
```

---

## Mettre en place la BDD sur Heroku

Dans le terminal de **Sqitch** ( se placer dans le dossier de sqitch )

```bash
# Ajouter une target a sqitch avec la DATABASE_URL (postgres://user:mdp@host:port/database)
sqitch target add heroku DATABASE_URL
# Comme avec les remote de git on peut verifier les connection
sqitch target
```

```bash
# Deploier la BDD sur heroku
sqitch deploy heroku
# Les option de sqitch sont dispo deploy/revert/verify
```

---

## Push sur Heroku

```bash
# Push comme sur github
git push heroku nom-de-la-branch
```

---

## Verifier que tout c'est bien passer

```bash
# Afficher les logs dans le terminal
heroku logs --tail
```

---
