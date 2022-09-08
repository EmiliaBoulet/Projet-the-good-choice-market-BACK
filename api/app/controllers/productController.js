//* Import de debug
import Debug from "debug";
const debugProductControllerStart = Debug("productController");
const debugProductControllerEnd = Debug("productController:end");

//* import du datamapper de brand
import { productModel } from "../models/productDatamapper.js";

export const productController = {
    /**
    * Récupère toutes les marques disponibles dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAll(req, res) {
        try {
            debugProductControllerStart("productController check getAll");
            const result = await productModel.getAll();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugProductControllerEnd("productController valide getAll");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupère une marque dispnible dans la BDD en fonction de son nom
    * @param {*} req Récupère le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    */
    async getOne(req, res) {
        try {
            const id = req.params.id;
            debugProductControllerStart("productController check getOne");
            const result = await productModel.getOne(id);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugProductControllerEnd("productController valide getOne");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Ajoute un produit dans le panier de l'utilisateur
    * @param {*} req Récupère le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne les produits ajoutés au panier par l'utilisateur identifié par son email
    */
    async addProductInBasket(req, res) {
        try {
            const productId = req.params.id;
            const email = req.session.user.email;
            debugProductControllerStart("productController check addProductInBasket");
            const result = await productModel.addProductInBasket(productId, email);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugProductControllerEnd("productController valide addProductInBasket");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Recupere tout les produit d'une sous categorie
    * @param {*} req Recupere le nom de la categorie dans l'url
    * @param {*} res Retourne le resultat
    * @returns retourne les produits en fonction de la sous categorie
    */
    async productsBySubCategory(req, res) {
        try {
            const name = req.params.name;
            debugProductControllerStart("productController check productsBySubCategory");
            const result = await productModel.getProductsFromSubCategory(name);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugProductControllerEnd("productController valide productsBySubCategory");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getFavorites(req, res) {
        try {
            debugProductControllerStart("productController check getFavorites");
            const result = await productModel.getRandomProducts();
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugProductControllerEnd("productController valide getFavorites");
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

};
