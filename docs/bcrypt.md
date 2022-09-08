# BCRYPT

---

## À quoi ça sert ?

***Bcrypt*** permet de chiffrer des string

On peut par exemple chiffer un mot de passe pour le stocker en BDD et le rendre "indechiffrable"

Document sur la loi qui oblige a chiffrer les données sensible des utilisateur [ici](https://www.cnil.fr/fr/lacces-des-autorites-publiques-aux-donnees-chiffrees)

---

## Comment ça marche ?

On prend un mot de passe

On le melange avec du "salt" (methode de chiffrage) et on retourne le resultat en BDD

---

### Exemple de chiffrage d'un mot de passe

```js
// On recupere un utilisateur via un formulaire
const newUser = req.body;

// On recupere uniquement sont mot de passe
const password = newUser.password;

// On transforme le mot de passe en string pour etre sur
// Contre exemple : 1234 === integer donc Bcrypt n'arrive pas a faire la comparaison
password.toString();

// On gere du "salt"
const salt = await bcrypt.genSalt(10);

// On melange le "salt" avec le mot de passe
const hash = await bcrypt.hash(password, salt);

// On remplace le mot de passe en clair par le mot de passe chiffrer
newUser.password = hash;

// On envoie le nouvelle utilisateur avec sont mot de passe chiffrer en BDD
const savedUser = await userModel.postOne(newUser);
```

---

### Exemple de l'utilisation de Bcrypt sur un mot de passe

```js
// On recupere l'email et le mot de passe dans un formullaire
const email = req.body.email;
const password = req.body.password;

// On verifie que l'utilisateur existe en BDD
const result = await userModel.checkEmailPassword(email);

// On recupere uniquement le mot de passe de l'utilisateur trouver en BDD
const passwordInBDD = result.password;

// On transforme les mot de passe en string pour etre sur
// Contre exemple : 1234 === integer donc Bcrypt n'arrive pas a faire la comparaison
password.toString();
passwordInBDD.toString();

// On donne a Bcrypt les 2 mot de passe pour qu'il les compare
const comparePassword = await bcrypt.compare(password, passwordInBDD);

// La fonction compare retourne true ou false
console.log(comparePassword);
```

---
