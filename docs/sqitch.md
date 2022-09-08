# Sqitch

---

## À quoi ça sert ?

Sqitch est un outils HYPER PUISSANT pour gerer et versionner sa BDD

Il permet des mise a jour, des suppression et des verification a des BDD local et/ou a distance

Il necessite beaucoup de configuration mais une fois passer une utilisation tres simple

---

## Comment ça marche ?

On crée des version que sqitch va exposer a la BDD

On dispose de 3 commandes

- deploy -- deployer les versions
- revert -- annuler les versions
- verify -- verifier les versions

---

### Mise en place de Sqitch

```bash
# Pour installer sqitch dans un projet sous Postgresql
sqitch init the-good-choice-market --engine pg
# Cette ligne crée plusieur dossier et fichier vide
```

---

### Mise en place du fichier sqitch.plan

Fichier recapitulatif des vertion

Permet a sqitch de deployer les version dans un certain ordre

En changeant l'ordre des version on change l'ordre de deployement

---

### Mise en place du fichier sqitch.conf

```bash
[core]
	engine = pg # Indique le module de connection a la BDD utiliser
	# plan_file = # Indique le chemin vers le fichier sqitch.plan
	# top_dir = # Indique le chemin vers le dossier dans le quelle activer sqitch
[engine "pg"]
	target = db:pg:URL # permet de directement ecrire l'url de connexion a la BDD local
[target "heroku"]
	uri = # Uri de connexion a une BDD externe
```

---

### La configuration de sqitch

```bash
# Pour ajouter une version 
sqitch add 01-create_tables -n "creation de tables en BDD"
# Cette ligne crée des fichier à remplir, prioriser les noms 01-02-03-...
```

Essayer de crée le plus de version possibles pour separer un maximum en fonction des ajout

- 01-create-tables
- 02-insert-data
- 03-types
- 04-functions
- 05-index
- 06-...

---

### Utiliser les target de sqitch

Pour ajouter une connection

```bash
sqitch target add NOM_DE_LA_CONNECTION DATABASE_URL
```

Pour retirer une connection

```bash
sqitch target remove NOM_DE_LA_CONNECTION
```

Pour verifier les connection

```bash
sqitch target
```

---

### Pour mettre en place le versioning

Pour deployer la BDD

```bash
sqitch deploy
```

Pour annuler les changement BDD

```bash
sqitch revert
```

Pour verifier que tout c'est bien passer

```bash
sqitch verify
```

---
