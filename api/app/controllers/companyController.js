//* Import de debug
import Debug from "debug";
const debugCompanyControllerStart = Debug("companyController");
const debugCompanyControllerEnd = Debug("companyController:end");

//* import du datamapper de brand
import { companyModel } from "../models/companyDatamapper.js";

export const companyController = {
    /**
    * Recupere toutes les company dispo dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAll(req, res) {
        try {
            debugCompanyControllerStart("companyController check getAll");
            const result = await companyModel.getAll();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugCompanyControllerEnd("companyController valide getAll");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
};
