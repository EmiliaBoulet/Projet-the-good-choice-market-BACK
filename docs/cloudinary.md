# Cloudinary

Base de donnée en ligne et gratuite permettant de stocker des image sans polluer sa BDD

---

## Mise en place

```bash
npm i cloudinary
```

---

### Connexion a son compte cloudinary

⚠️ **Les mots de passe sont a mettre dans le .env** ⚠️

```js
import cloudinary from "cloudinary";
cloudinary.v2;

cloudinary.config({ // info de connexion dispo sur le compte
    cloud_name: "ezfw8g2yn",
    api_key: "979919815625678",
    api_secret: "Xc8-QQm6A7hBjyfbI8S-GcOTFPI"
});

export default cloudinary;
```

---

### Utilisation

#### Pour envoyer des images sur cloudinary

Exemple avec un formulaire qui envoye un url et un nom d'image

```js
app.post('/upload', (req, res) => {
    const imageUrl = req.body.imageUrl; // recup de l'url de limage
    const imageName = req.body.imageName; // recup du futur nom de l'image
    try {
        /* EXEMPLE */
        // cloudinary.v2.uploader.upload(
        //     "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        //     { public_id: "olympic_flag" },
        //     function(error, result) {console.log(result); }
        // );
        /* ******* */
        cloudinary.v2.uploader.upload(
            imageUrl,
            { public_id: imageName },
            function(error, result) {console.log(result); }
        );
        res.json(req.file);
    } catch (error) {
        console.error(error);
    }
});
```

#### Pour recuperer des images sur cloudinary

Permet de recuperer les infos de l'image et surtout une URL pour utiliser l'image

```js
app.post("/fetch", async (req, res) => {
    const imageName = req.body.imageName;
    try {
        const options = {
            colors: true,
        };
        const result = await cloudinary.api.resource(imageName, options);
        res.json(result)
    } catch (error) {
        console.error(error);
    }
});
```

---
