# Jest

---

## À quoi ça sert ?

Jest est un module qui permet de faire des test sur notre code

Il y a 2 maniere de voir les chose

- TDD : On code les test et apres on developpe l'application
- TU : On developpe l'application et on realise des test unitaire pour verifier que tout ce passe comme on le souhaite

---

## Comment ça marche ?

Video de presentation des grande ligne de Jest [ici](https://www.youtube.com/watch?v=Jv2uxzhPFl4&t=686s)

Video de tuto sur sont utilisation (en fr) [ici](https://www.youtube.com/watch?v=8l-5pjZAxEY&t=1313s) et [la](https://www.youtube.com/watch?v=NsdvJemK2BY)

La doc officiel pour le Get Started et des infos complementaire [ici](https://jestjs.io/)

Une video sur les TDD [ici](https://www.youtube.com/watch?v=EZ05e7EMOLM)

Un autre module pour tester uniquement les routes [ici](https://github.com/visionmedia/supertest) et [la](https://zellwk.com/blog/endpoint-testing/)

Et [ici](https://www.youtube.com/watch?v=FKnzS_icp20)

⚠️⚠️⚠️

Pour utiliser Jest en back il faut avoir un server qui n'emet pas

Dans ce repo on utilise une copie du `server.js` ===> `appTest.js`

Il faut aussi utiliser le module `supertest` pour realiser des requete sur ce "server"

⚠️⚠️⚠️

---

## La config de jest

### A installer

- Pour avoir les infos sur les composant de jest
  - @types/jest
- Pour passer Jest en ES6
  - @babel/core @babel/preset-env babel-jest babel-plugin-transform-es2015-modules-commonjs

### Script

Dans les script du `package.json` ajouter :

- Pour avoir le nodemon de jest et des detaille supplementaire
  - test: jest --watchAll --verbose
- Pour avoir un recap des test, les lister, avoir des statistique, ...
  - test:cov: jest --coverage

### Babel pour ES6

Ajouter un fichier `.babelrc` et ajouter :

```json
{
    "env": {
        "test": {
            "plugins": ["transform-es2015-modules-commonjs"]
        }
    }
}
```

Ce fichier transforme les import/export d'ES6 en const/require pour jest

### Convention et choses a respecter

Les fichier lu par Jest sont tous pareille :

`trucMuche.test.js` l'extention test permet a Jest de trouver les fichier

Si un fichier `toto.js` est a tester, on respecter les convention et on appelle le fichier de test `toto.test.js`

Pour lancer les test :

```bash
npm t # Et le script "test" ce relancera a chaque save ( ctrl + s )
```

---

## Exemple

On veut tester une fonction

```js
export function sum(a, b) {
    return a + b;
}
```

Dans un fichier avec l'extention `.test.js`

```js
import { sum } from "./sum.js";

// On decrit les test que l'on realise
describe("truc", () => {
    // Le .toto permet de faire une liste de test a realiser
    //Jest nous le rappel mais ils n'ont aucun impact
    it.todo("toto");

    // Ici on veux verifier que 1 + 2 === 3
    it("adds 1 + 2 to equal 3", () => {
        // On decrit ce que l'on attend
        expect(
            sum(1, 2) // On appelle la fonction que l'on veux tester
        // Et on decrit le resultat attendu 
        ).toBe(3);
    });
});
```

Resultat du test avec Jest

```bash
PASS  api/tests/sum.test.js
  truc # Le nom du describe
    √ adds 1 + 2 to equal 3 (1 ms) # Le test est bien passer
    ✎ todo toto # Le todo a faire

Test Suites: 1 passed, 1 total
Tests:       1 todo, 3 passed, 4 total
Snapshots:   0 total
Time:        0.336 s, estimated 1 s
Ran all test suites.
```

---
