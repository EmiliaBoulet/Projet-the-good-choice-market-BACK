//* import de debug
import Debug from "debug";
const debugBrandModelStart = Debug("brandModel");
const debugBrandModelEnd = Debug("brandModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const brandModel = {
    /**
    * Récupère tout les indices de la amrque en BDD
    * @returns Retourne le resultat de la query
    */
    async getAll() {
        const query = {
            text: "SELECT * FROM \"brand\";"
        };
        debugBrandModelStart("brandModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de marque correspondante!");
        }
        debugBrandModelEnd("brandModel valide getAll");
        return result.rows;
    },

    /**
    * Récupère l'indice de la marque en BDD
    * @param {*} indice L'indice en params pour faire la query pour la BDD
    * @returns Retourne le resultat de la query
    */
    async getOne(id) {
        const query = {
            text: "SELECT * FROM \"brand\" WHERE \"id\" = $1;",
            values: [id]
        };
        debugBrandModelStart("brandModel check getOne");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de marque correspondante!");
        }
        debugBrandModelEnd("brandModel valide getOne");
        return result.rows[0];
    },
    /**
    * Recupere tout les produits d'une marque
    * @param {*} name Le nom de la marque
    * @returns retourne les marques des produits concernés
    */
    async getBrandWithProduct(id) {
        const query = {
            text: `SELECT
                        "brand".*,
                        "product".*,
                        (SELECT * FROM "func_price_ttc_for_one"($1) AS price_ttc)
                    FROM "brand"
                    INNER JOIN "product" ON "product"."brand_id" = "brand"."id"
                    WHERE "brand"."id" = $1;`,
            values: [id]
        };
        debugBrandModelStart("brandModel check getBrandWithProduct");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de marque correspondante!");
        }
        debugBrandModelEnd("brandModel valide getBrandWithProduct");
        return result.rows;
    },
};
