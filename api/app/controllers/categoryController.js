//* Import de debug
import Debug from "debug";
const debugCategoryControllerStart = Debug("categoryController");
const debugCategoryControllerEnd = Debug("categoryController:end");

//* import du datamapper de brand
import { categoryModel } from "../models/categoryDatamapper.js";

export const categoryController = {
    /**
    * Recupere toutes les brand dispo dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAll(req, res) {
        try {
            debugCategoryControllerStart("categoryController check getAll");
            const result = await categoryModel.getAll();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugCategoryControllerEnd("categoryController valide getAll");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Recupere toutes les sous categorie d'une categorie
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns  retourne les catégories des produits concernés
    */
    async subCategoryByCategory(req, res) {
        try {
            debugCategoryControllerStart("categoryController check subCategoryByCategory");
            const result = await categoryModel.getSubCategoryByCategory();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugCategoryControllerEnd("categoryController valide subCategoryByCategory");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
};
