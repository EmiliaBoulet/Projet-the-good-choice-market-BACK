import { errorHandling } from "../services/error/errorHandling.js";

export const errorController = {
    /**
    * Permet de gerer toutes les fausse route
    * @param {*} res Retourne une erreur 404
    */
    notFound(req, res) {
        const error = new Error("404 Not Found !");
        error.code = 404;
        error.url = req.originalUrl;
        error.method = req.method;
        errorHandling.manage(error, res);
    },
};
