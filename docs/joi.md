# JOI

---

## À quoi ça sert ?

***Joi*** est un module qui permet de verifier le contenu d'un formulaire contenue dans le `req.body`

Il permet de rajouter une couche de securiter en plus

---

## Comment ça marche ?

On recupere le `req.body`, on le donne a ***Joi*** qui verifie qu'il corespond bien au prerequis

---

### Exemple

#### On crée un schema que le formulaire doit respecter

```js
const schema = Joi.object({
    // On decrit chaque champs du formulaire et on applique Joi
    name: Joi
        // On indique que la value doit etre de type string
        .string()

        // On definie un minimum de caractere
        .min(4)

        // Et un maximum
        .max(10)

        // On indique qu'une value est obligatoire
        .required(),

    email: Joi
        .string()

        // La value doit respecter cette regex
        .pattern(new RegExp("^[a-zA-Z1-9.-]+@[a-z]+.[a-z]{2,3}$"))

        // On precise que la value est de type email et quelle doit respecter ses conditions
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp("^[a-zA-Z1-9:!;.+]{8,15}$"))
        .required(),

// On indique que le formulaire est obligatoire
}).required();
```

#### On recupere le req.body pour le passer dans notre schema

```js
const bodyValidator = async (req, res, next) => {
    try {
        // On envoi le formulaire a notre schema
        const body = await schema.validateAsync(req.body);

        // Si Joi nous renvoie une erreur on arrete la fonction
        if(body.error){
            throw new Error("Le schema est invalide");
        }
        else{
            // Si Joi valide et on passe a la suite
            next();
        }
    } catch (error) {
        return error;
    }
};
```

#### On applique notre fonction avant les controller pour une preverification

```js
userRouter
    .route("/user")
    .post(bodyValidator, userController.insertOne)
;
```

---
