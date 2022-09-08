//* Import des schemas de Joi
import { userSchema, productSchema, loginSchema, patchUserSchema } from "../services/Joi/schema.js";

/**
* Middleware qui verifie que les data du formulaire sont valide
* @param {*} req Recupere le body du formulaire et le compare avec le schema predefinie
* @param {*} next Si tout est ok passe a la suite
* @returns Retourne en cas d'erreur
*/
export const userValidator = (req, res, next) => {
    try {
        // On envoi le formulaire a notre schema
        const body = userSchema.validate(req.body);
        // Si Joi nous renvoie une erreur on arrete la fonction
        if(body.error) {
            throw new Error("Le schema du user est invalide");
        }
        else{
            // Si Joi valide et on passe a la suite
            next();
        }
    } catch (error) {
        return res.status(400).json({ error:error.message });
    }
};

/**
* Middleware qui verifie que les data du formulaire sont valide
* @param {*} req Recupere le body du formulaire et le compare avec le schema predefinie
* @param {*} next Si tout est ok passe a la suite
* @returns Retourne en cas d'erreur
*/
export const productValidator = (req, res, next) => {
    try {
        const body = productSchema.validate(req.body);
        if(body.error) {
            throw new Error("Le schema du product est invalide");
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

/**
* Middleware qui verifie que les data du formulaire sont valide
* @param {*} req Recupere le body du formulaire et le compare avec le schema predefinie
* @param {*} next Si tout est ok passe a la suite
* @returns Retourne en cas d'erreur
*/
export const loginValidator = (req, res, next) => {
    try {
        const body = loginSchema.validate(req.body);
        if(body.error) {
            throw new Error("Le schema du login est invalide");
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

/**
* Middleware qui verifie que les data du formulaire sont valide
* @param {*} req Recupere le body du formulaire et le compare avec le schema predefinie
* @param {*} next Si tout est ok passe a la suite
* @returns Retourne en cas d'erreur
*/
export const patchUserValidator = (req, res, next) => {
    try {
        const body = patchUserSchema.validate(req.body);
        if(body.error) {
            throw new Error("Le schema du patch est invalide");
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
