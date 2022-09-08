//* Import de debug
import Debug from "debug";
const debugUserControllerStart = Debug("userController");
const debugUserControllerEnd = Debug("userController:end");

//* Import des 2 options de bcrypt le chiffrage et la comparaison
import bcryptChiffrage from "../services/Bcrypt/chiffrage.js";
import bcryptCompare from "../services/Bcrypt/compare.js";

//* import du datamapper de user
import { userModel } from "../models/userDatamapper.js";

//* import du service error
import { errorHandling } from "../services/error/errorHandling.js";


export const userController = {
    /**
    * Recupere toutes les users dispo dans la BDD
    * @param {*} res Retourne le resultat en json
    */
    async getAllUser(req, res) {
        console.log(req.session.user);

        try {
            debugUserControllerStart("userController check getAllUser");
            const result = await userModel.getAll();
            if (result.message) {
                const error = result.message;
                error.code = 500;
                error.url = req.originalUrl;
                error.method = req.method;
                errorHandling.manage(error, res);
                // return res.status(500).json({ message: result.message });
            }
            debugUserControllerEnd("userController valide getAllUser");
            res.status(200).json(result);
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Recupere un user dispo dans la BDD en fonction de son indice
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    */
    async getOneUser(req, res) {
        console.log(req.session.user);

        try {
            const email = req.params.email;
            if (req.session.user.email !== email) {
                return res.status(401).json({ message: "user ne corespond pas" });
            }
            debugUserControllerStart("userController check getOneUser");
            const result = await userModel.getOne(email);
            if (result.message) {
                result.code = 500;
                result.url = req.originalUrl;
                result.method = req.method;
                errorHandling.manage(result, res);
                // return res.status(500).json({ message: result.message });
            }
            debugUserControllerEnd("userController valide getOneUser");
            res.status(200).json(result);
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet de recuperer tout les produits du panier de l'utilisateur
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns les produits ajouté au panier par l'utilisateur identifé par son email.
    */
    async getBasketByUserMail(req, res) {
        console.log(req.session.user);

        try {
            const email = req.params.email;
            debugUserControllerStart("userController check getBasketByUserMail");
            const basket = await userModel.findBasketByUserMail(email);
            if (!basket) {
                return res.status(200).json({ message: "le panier est vide" });
            }
            if (req.session.user.email !== basket.email) {
                return res.status(401).json({ message: "user ne corespond pas" });
            }
            if (basket.message) {
                return res.status(500).json({ message: basket.message });
            }
            debugUserControllerEnd("userController valide getBasketByUserMail");
            res.status(200).json(basket);
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet de crée un nouvelle utilisateur
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns   retourne les données de l'utilisateur qu'on vient d'ajouter à la BDD.
    */
    async create(req, res) {
        console.log(req.session.user);

        try {
            const newUser = req.body;
            if (!newUser.firstname) {
                return res.status(400).json({ message: "Le prenom est obligatoire !" });
            }
            if (!newUser.lastname) {
                return res.status(400).json({ message: "Le nom est obligatoire !" });
            }
            if (!newUser.birthday) {
                newUser.birthday = null;
            }
            if (!newUser.email) {
                return res.status(400).json({ message: "L'email est obligatoire !" });
            }
            if (!newUser.password) {
                return res.status(400).json({ message: "Le mot de passe est obligatoire !" });
            }
            if (!newUser.phone_number) {
                // eslint-disable-next-line camelcase
                newUser.phone_number = null;
            }
            if (!newUser.address) {
                newUser.address = null;
            }
            if (!newUser.city) {
                newUser.city = null;
            }
            if (!newUser.country) {
                newUser.country = null;
            }

            //* On passe le mdp en clair a la fonction bcrypt
            const newUserChiffredPassword = await bcryptChiffrage(newUser.password);
            //* On applique le mdp chiffrer a la place du mdp en clair sur les data de l'utilisateur
            newUser.password = newUserChiffredPassword;

            debugUserControllerStart("userController check create");
            const savedUser = await userModel.postOne(newUser);
            if (savedUser.message) {
                return res.status(500).json({ message: savedUser.message });
            }
            debugUserControllerEnd("userController valide create");
            res.status(200).json(savedUser);

        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet de mettre a jour les infos de l'utilisateur
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne les données qui veinnet d'âtre mise à jour dans la BDD.
    */
    async update(req, res) {
        console.log(req.session.user);

        try {
            const email = req.params.email;
            const newUser = req.body;
            if (req.session.user.email !== email) {
                return res.status(401).json({ message: "user ne corespond pas" });
            }

            if (newUser.password) {
                //* On passe le mdp en clair a la fonction bcrypt
                const newUserChiffredPassword = await bcryptChiffrage(newUser.password);
                //* On applique le mdp chiffrer a la place du mdp en clair sur les data de l'utilisateur
                newUser.password = newUserChiffredPassword;
            }

            debugUserControllerStart("userController check update");
            const savedUser = await userModel.updateOne(email, newUser);
            if (savedUser.message) {
                return res.status(500).json({ message: savedUser.message });
            }
            debugUserControllerEnd("userController valide update");
            res.status(200).json(savedUser);
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet de supprimer un utilisateur
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne les données qui viennent d'âtre effacées dans la BDD.
    */
    async delete(req, res) {
        console.log(req.session.user);

        try {
            const email = req.params.email;
            if (req.session.user.email !== email) {
                return res.status(401).json({ message: "user ne corespond pas" });
            }
            debugUserControllerStart("userController check delete");
            const result = await userModel.deleteOne(email);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            }
            debugUserControllerEnd("userController valide delete");
            delete result.password;
            req.session.destroy();
            res.status(200).json(result);
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet a l'utilisateur de se connecter avec express-session
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne l'utilisateur qui vient de se logger.
    */
    async login(req, res) {
        console.log(req.session.user);

        //! Je recupere et verifie qu'il y ai bien l'email et le mdp
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                return res.status(404).json({ message: "error il manque des informations" });
            }

            //! Je recherche l'utilisateur par son email
            debugUserControllerStart("userController check login");
            const result = await userModel.checkEmailPassword(email);
            if (!result) {
                return res.status(500).json({ message: "user inconnu en BDD" });
            }
            debugUserControllerEnd("userController valide login");

            const userPasswordToCheck = result.password;

            //! Je compare que les 2 mdp soient identique
            const checkPassword = await bcryptCompare(password, userPasswordToCheck);
            if (checkPassword === false) {
                return res.status(401).json({ message: "Le mot de passe est incorect !" });
            }

            //! Je supprime le mdp
            delete result.password;
            //! Je stock l'utilisateur en session
            req.session.user = result;
            res.status(200).json({ message: "user connecté", result });
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Permet a l'utilisateur de ce deconnecter
    * @param {*} req Recupere le parametre dans l'url
    * @param {*} res Retourne le resultat en json
    * @returns retourne le message d'erreur.
    */
    async logout(req, res) {
        console.log(req.session.user);

        try {
            debugUserControllerStart("userController check logout");
            if (!req.session.user) {
                return res.status(401).json({ message: "user n'est pas connecté" });
            }
            req.session.destroy();
            res.status(200).json({ message: "user deconnecté" });
        } catch (error) {
            error.code = 400;
            error.url = req.originalUrl;
            error.method = req.method;
            errorHandling.manage(error, res);
            // return res.status(400).json({ error: error.message });
        }
    },
};
