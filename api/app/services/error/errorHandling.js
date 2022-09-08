import fs from "fs";

export const errorHandling = {
    /**
    * Gère les erreurs
    */
    manage(error, res) {
        // 1. Enregistrer l'erreur dans des logs
        fs.appendFile(`api/logs/log-${new Date().toDateString()}.txt`, `${new Date()} - ${error.method} - ${error.url} - ${error.message}\r`, (err) => {
            if (err) throw err;
        });

        // 2. Informer l'utilisateur via un message
        res.status(error.code).json(error.message);
    },
};
