//* import de debug
import Debug from "debug";
const debugProductModelStart = Debug("productModel");
const debugProductModelEnd = Debug("productModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const productModel = {
    /**
     * Récupère tout les indices de la marque en BDD
     * @returns Retourne le resultat de la query
     */
    async getAll() {
        const query = {
            text: `SELECT
                    "brand"."brand_name" AS "brand_name",
                    "sub_category"."name" AS "sub_category_name",
                    "product".*
                FROM "product"
                INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
                INNER JOIN "sub_category" ON "sub_category"."id" = "product"."sub_category_id";`,
        };
        debugProductModelStart("productModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de produit(s) correspondant(s)!");
        }
        debugProductModelEnd("productModel valide getAll");
        return result.rows;
    },

    /**
     * Récupère l'indice de la marque en BDD
     * @param {*} indice L'indice en params pour faire la query pour la BDD
     * @returns Retourne le resultat de la query
     */
    async getOne(id) {
        const query = {
            // text: "SELECT * FROM \"func_product_price_ttc\"($1)",
            text: `SELECT
            "product"."id" AS "product_id",
            "product"."name" AS "product_name",
            "brand"."brand_name",
            "sub_category"."name" AS "sub_category_name",
            "category"."name" AS "category_name",
            "product"."description",
            "product"."image",
            "product"."location",
            "product"."barcode",
            "product"."expiration_date",
            "product"."height",
            "product"."width",
            "product"."depth",
            "product"."weight",
            "product"."size",
            product.price_ht AS "price_ttc",
            "product"."price_promo",
            "product"."price_kg"
        FROM "product"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
        INNER JOIN "sub_category" ON "sub_category"."id" = "product"."sub_category_id"
        INNER JOIN "category" ON "sub_category"."category_id" = "category"."id"
        WHERE "product"."id" = $1;`,
            values: [id]
        };
        debugProductModelStart("productModel check getOne");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de produit correspondant!");
        }
        debugProductModelEnd("productModel valide getOne");
        return result.rows[0];
    },

    /**
     * Ajoute un produit dans le panier de l'utilisateur
     * @param {*} productName Le nom du produit
     * @param {*} email l'email de l'utilisateur
     * @returns retourne les produits ajoutés au panier par l'utilisateur identifié par son email
     */
    async addProductInBasket(productId, email) {
        const queryUser = {
            text: "SELECT \"user\".id FROM \"user\" WHERE \"email\" = $1;",
            values: [email]
        };
        const resultUser = await pool.query(queryUser);
        const idUser = resultUser.rows[0].id;

        const queryInsertIntoBuy = {
            text: "INSERT INTO buy(\"user_id\", \"product_id\") VALUES ($1, $2) RETURNING *;",
            values: [idUser, productId]
        };
        debugProductModelStart("productModel check addProductInBasket");
        const resultAddToBasket = await pool.query(queryInsertIntoBuy);
        if (!resultAddToBasket.rowCount) {
            throw new Error(" Aucun produit n'a été ajouté");
        }
        debugProductModelEnd("productModel valide addProductInBasket");
        return resultAddToBasket.rows[0];
    },

    /**
     * Recupere tout les produit d'une sous categorie
     * @param {*} name Le nom de la sous categorie
     * @returns retourne les produits et les sous categorie
     */
    async getProductsFromSubCategory(name) {
        const query = {
            text: `SELECT
                        "sub_category"."name" AS "sub_category_name",
                        json_agg(to_jsonb("brand") || to_jsonb("product".*)) AS "product"
                    FROM "product"
                    INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
                    INNER JOIN "sub_category" ON "sub_category"."id" = "product"."sub_category_id"
                    WHERE "sub_category"."name" = $1
                    GROUP BY "sub_category"."name";`,
            values: [name]
        };
        debugProductModelStart("productModel check getProductsFromSubCategory");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de produits correspondants !");
        }
        debugProductModelEnd("productModel valide getProductsFromSubCategory");
        return result.rows[0];
    },


    /**
     * Recupere les produits favoris
     * @returns retourne les produits favoris
     */
    async getRandomProducts() {
        const query = {
            // text: `SELECT * FROM product ORDER BY RANDOM() LIMIT 5;`,
            text: "SELECT * FROM product WHERE id = 9 OR id = 11 OR id = 1 OR id = 8 OR id =6;",
        };
        debugProductModelStart("productModel check getRandomProducts");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de produits favoris !");
        }
        debugProductModelEnd("productModel valide getRandomProducts");
        return result.rows;
    },


};