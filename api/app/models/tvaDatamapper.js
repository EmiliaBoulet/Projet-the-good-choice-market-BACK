//* import de debug
import Debug from "debug";
const debugTvaModelStart = Debug("tvaModel");
const debugTvaModelEnd = Debug("tvaModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const tvaModel = {
    /**
    * Récupère tout les indices de tva en BDD
    * @returns Retourne le resultat de la query
    */
    async getAll() {
        const query = {
            text: "SELECT * FROM \"tva\";"
        };
        debugTvaModelStart("tvaModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de tva correspondante(s)!");
        }
        debugTvaModelEnd("tvaModel valide getAll");
        return result.rows;
    },

    /**
    * Récupère l'indice de tva en BDD
    * @param {*} indice L'indice en params pour faire la query pour la BDD
    * @returns Retourne le resultat de la query
    */
    async getOne(indice) {
        const query = {
            text: "SELECT * FROM \"tva\" WHERE \"rate\" = $1;",
            values: [indice]
        };
        debugTvaModelStart("tvaModel check getOne");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de tva correspondante!");
        }
        debugTvaModelEnd("tvaModel valide getOne");
        return result.rows[0];
    },
};
