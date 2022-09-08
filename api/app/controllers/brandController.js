//* Import de debug
import Debug from "debug";
const debugBrandControllerStart = Debug("brandController");
const debugBrandControllerEnd = Debug("brandController:end");

//* import du datamapper de brand
import { brandModel } from "../models/brandDatamapper.js";

export const brandController = {
    /**
    * Récupère toutes les marques dispnibles dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAll(req, res) {
        try {
            debugBrandControllerStart("brandController check getAll");
            const result = await brandModel.getAll();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugBrandControllerEnd("brandController valide getAll");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupère une marque disponible dans la BDD en fonction de son indice
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    */
    async getOne(req, res) {
        try {
            const id = req.params.id;
            debugBrandControllerStart("brandController check getOne");
            const result = await brandModel.getOne(id);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugBrandControllerEnd("brandController valide getOne");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Recupere tout les produits d'une marque
    * @param {*} req Récupère le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne les marques des produits concernés
    */
    async getBrandWithProduct(req, res) {
        try {
            const id = req.params.id;
            debugBrandControllerStart("brandController check getBrandWithProduct");
            const result = await brandModel.getBrandWithProduct(id);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugBrandControllerEnd("brandController valide getBrandWithProduct");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
