//* Import de debug
import Debug from "debug";
const debugUserMiddleware = Debug("userMiddleware");

export const userCkeck = {
    /**
    * Middleware qui verifie qu'un utilisateur est connecter avec de passer au controller
    * @param {*} req Recupere la session de l'utilisateur
    * @param {*} next Si l'utilisateur est connecter passe a la suite (au controller)
    * @returns Retourne si l'utilisateur n'est pas connecter
    */
    userConnect(req, res, next) {
        if (!req.session.user) {
            debugUserMiddleware("userMiddleware invalide");
            return res.status(401).json({ message: "user n'est pas connecté" });
        }
        debugUserMiddleware("userMiddleware valide");
        next();
    },
};
