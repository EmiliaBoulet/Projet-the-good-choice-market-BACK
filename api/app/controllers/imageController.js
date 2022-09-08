/* eslint-disable camelcase */
//* Import du datamapper
import { imageDatamapper } from "../models/imageDatamapper.js";

export const imageController = {
    /**
    * Permet d'ajouter une image sur cloudinary
    * @param {*} req Recupere l'url de l'image
    * @param {*} res Retourne le resultat ou une erreur
    * @returns Retourne en cas d'erreur
    */
    async upload(req, res) {
        try {
            const imagePath = req.body.image;
            const result = await imageDatamapper.upload(imagePath);
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet de recuperer le l'url d'une image sur cloudinary
    * @param {*} req Recupere le nom de l'image
    * @param {*} res Retourne le resultat ou une erreur
    * @returns Retourne en cas d'erreur
    */
    async fetchByPublicId(req, res) {
        try {
            const publicId = req.body.public_id;
            const result = await imageDatamapper.fetchByPublicId(publicId);
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet d'ajouter une image sur cloudinary et un produit en BDD
    * @param {*} req Recupere l'url de l'image et toute les infos d'un produit
    * @param {*} res Retourne le resultat ou une erreur
    * @returns Retourne en cas d'erreur
    */
    async uploadOneProductWithImage(req, res) {
        try {
            let {
                name, description, image, location, barcode, expiration_date, height, width, depth, weight, size, price_ht, price_promo, price_kg, tva_id, brand_id, sub_category_id
            } = req.body;

            if (!name || !description || !image || !price_ht || !tva_id || !brand_id || !sub_category_id) {
                return res.status(500).json({ message: "Il manque des infos !" });
            }
            if (!location) {
                location = null;
            }
            if (!barcode) {
                barcode = null;
            }
            if (!expiration_date) {
                expiration_date = null;
            }
            if (!height) {
                height = null;
            }
            if (!width) {
                width = null;
            }
            if (!depth) {
                depth = null;
            }
            if (!weight) {
                weight = null;
            }
            if (!size) {
                size = null;
            }
            if (!price_promo) {
                price_promo = null;
            }
            if (!price_kg) {
                price_kg = null;
            }

            const body = { name, description, image, location, barcode, expiration_date, height, width, depth, weight, size, price_ht, price_promo, price_kg, tva_id, brand_id, sub_category_id };
            const result = await imageDatamapper.uploadOneProductWithImage(image, body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
};
