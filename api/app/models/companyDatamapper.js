//* import de debug
import Debug from "debug";
const debugCompanyModelStart = Debug("companyModel");
const debugCompanyModelEnd = Debug("companyModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const companyModel = {
    /**
    * Récupère toutes les companies en BDD
    * @returns Retourne le resultat de la query
    */
    async getAll() {
        const query = {
            text: "SELECT * FROM \"company\";"
        };
        debugCompanyModelStart("companyModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de compagnie correspondante !");
        }
        debugCompanyModelEnd("companyModel valide getAll");
        return result.rows;
    },
};
