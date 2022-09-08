//* Import de debug
import Debug from "debug";
const debugTvaControllerStart = Debug("tvaController");
const debugTvaControllerEnd = Debug("tvaController:end");

//* import du datamapper de tva
import { tvaModel } from "../models/tvaDatamapper.js";

export const tvaController = {
    /**
    * Recupere toutes les tva dispo dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAll(req, res) {
        try {
            debugTvaControllerStart("tvaController check getAll");
            const result = await tvaModel.getAll();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugTvaControllerEnd("tvaController valide getAll");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Recupere une tva dispo dans la BDD en fonction de sont indice
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    */
    async getOne(req, res) {
        try {
            const indice = req.params.indice;
            debugTvaControllerStart("tvaController check getOne");
            const result = await tvaModel.getOne(indice);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugTvaControllerEnd("tvaController valide getOne");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
};
