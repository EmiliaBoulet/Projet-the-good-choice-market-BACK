/* eslint-disable camelcase */
//* Import de la connexion a cloudinary
import cloud from "./config/cloudinaryConnect.js";

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const imageDatamapper = {
    /**
    * Permet d'ajouter une image dans la banque cloudinary grace a un url
    * @param {*} imagePath Recupere l'url de l'image dans le formulaire
    * @returns Retourne le nom de l'image enregistrer sur cloudinary
    */
    async upload(imagePath) {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        const result = await cloud.uploader.upload(imagePath, options);
        return result.public_id;
    },

    /**
    * Permet de recuperer l'url d'une image dans la banque
    * @param {*} publicId Nom de l'image
    * @returns Retourne l'url de l'image
    */
    async fetchByPublicId(publicId) {
        const options = {
            colors: true,
        };
        const result = await cloud.api.resource(publicId, options);
        return result.url;
    },

    // async transformImage(publicId, colors) {
    //     const [effectColor, backgroundColor] = colors;
    //     let imageTag = cloud.image(publicId, {
    //         transformation: [
    //             { width: 250, height: 250, gravity: "faces", crop: "thumb" },
    //             { radius: "max" },
    //             { effect: "outline:10", color: effectColor },
    //             { background: backgroundColor },
    //         ],
    //     });
    //     return imageTag;
    // },

    /**
    * Permet d'ajouter un produit en BDD avec une image sauvegarder sur cloudinary
    * @param {*} imagePath Recupere l'url de l'image dans le formulaire
    * @param {*} body Recupere toutes les infos necessaire pour la creation d'un produit
    * @returns Retourne le produit crée avec l'url crée par cloudinary
    */
    async uploadOneProductWithImage(imagePath, body) {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        const { url } = await cloud.uploader.upload(imagePath, options);
        const query = {
            text: `INSERT INTO "public"."product" (
                    "name",
                    "description",
                    "image",
                    "location",
                    "barcode",
                    "expiration_date",
                    "height",
                    "width",
                    "depth",
                    "weight",
                    "size",
                    "price_ht",
                    "price_promo",
                    "price_kg",
                    "tva_id",
                    "brand_id",
                    "sub_category_id"
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;`,
            values: [ body.name, body.description, url, body.location, body.barcode, body.expiration_date, body.height, body.width, body.depth, body.weight, body.size, body.price_ht, body.price_promo, body.price_kg, body.tva_id, body.brand_id, body.sub_category_id ]
        };
        const result = await pool.query(query);
        return result.rows[0];
    },
};
