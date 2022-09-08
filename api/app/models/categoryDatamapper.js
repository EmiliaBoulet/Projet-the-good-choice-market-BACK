//* import de debug
import Debug from "debug";
const debugCategoryModelStart = Debug("categoryModel");
const debugCategoryModelEnd = Debug("categoryModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const categoryModel = {
    /**
    * Récupère tout les indices de categories en BDD
    * @returns Retourne le resultat de la query
    */
    async getAll() {
        const query = {
            text: "SELECT * FROM \"category\""
        };
        debugCategoryModelStart("categoryModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de catégorie correspondante!");
        }
        debugCategoryModelEnd("categoryModel valide getAll");
        return result.rows;
    },

    /**
    * Recupere toutes les categories avec leur sous categories
    * @returns Retourne le resultat en format json
    */
    async getSubCategoryByCategory() {
        const query = {
            text: "SELECT * FROM \"view_category_sub_category\";"
        };
        debugCategoryModelStart("categoryModel check getSubCategoryByCategory");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de sous-catégorie correspondante!");
        }
        debugCategoryModelEnd("categoryModel valide getSubCategoryByCategory");
        return result.rows;
    },
};
