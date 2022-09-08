//* import de debug
import Debug from "debug";
const debugUserModelStart = Debug("userModel");
const debugUserModelEnd = Debug("userModel:end");

//* import du module pool
import * as Pool from "./config/dbConnect.js";
const pool = Pool.default();

export const userModel = {
    /**
    * Recupere tout les users en BDD
    * @returns Retourne le resultat de la query
    */
    async getAll() {
        const query = {
            text: "SELECT * FROM \"user\";"
        };
        debugUserModelStart("userModel check getAll");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas de user correspondant!");
        }
        debugUserModelEnd("userModel valide getAll");
        return result.rows;
    },

    /**
    * Recupere un user en BDD
    * @param {*} indice L'indice en params pour faire la query pour la BDD
    * @returns Retourne le resultat de la query
    */
    async getOne(userEmail) {
        const query = {
            text: "SELECT * FROM \"user\" WHERE email = $1",
            values: [userEmail]
        };
        debugUserModelStart("userModel check getOne");
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            throw new Error("Il n'y a pas de user correspondant!");
        }
        debugUserModelEnd("userModel valide getOne");
        return result.rows[0];
    },

    /**
    * Recupere le panier d'un utilisateur
    * @param {*} userEmail L'adresse mail de l'utilisateur
    * @returns les produits ajouté au panier par l'utilisateur identifé par son email.
    */
    async findBasketByUserMail(userEmail) {
        const query = {
            text: "SELECT * FROM \"func_basket_final_price\"($1);",
            values: [userEmail]
        };
        debugUserModelStart("userModel check findBasketByUserMail");
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            throw new Error("Il n'y a pas de panier associé à cet utilisateur!");
        }
        debugUserModelEnd("userModel valide findBasketByUserMail");
        return result.rows[0];
    },

    /**
    * Ajoute un nouvelle utilisateur
    * @param {*} user session de l'utilisateur
    * @returns retourne les données de l'utilisateur qu'on vient d'ajouter à la BDD.
    */
    async postOne(user) {
        const query = {
            text: `INSERT INTO "user" (
                        "firstname",
                        "lastname",
                        "birthday",
                        "email",
                        "password",
                        "phone_number",
                        "address",
                        "postal_code",
                        "city",
                        "country"
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING *;`,
            values: [user.firstname, user.lastname, user.birthday, user.email, user.password, user.phone_number, user.address, user.postal_code, user.city, user.country]
        };
        debugUserModelStart("userModel check postOne");
        const savedUser = await pool.query(query);
        if (!savedUser.rowCount) {
            throw new Error("cet utilisateur existe déjà!");
        }
        debugUserModelEnd("userModel valide postOne");
        return savedUser.rows;
    },

    /**
    * Modifie un utilisateur
    * @param {*} email Email en parms
    * @param {*} newUser Utilisateur mis à jour
    * @returns retourne les données qui veinnet d'âtre mise à jour dans la BDD.
    */
    async updateOne(email, newUser) {
        const oldQuery = {
            text: `
                SELECT
                    *
                FROM "public"."user"
                WHERE "email" = $1;`,
            values: [email]
        };
        debugUserModelStart("userModel check updateOne");
        const oldUser = await pool.query(oldQuery);
        if (oldUser.rowCount === 0) {
            throw new Error("L'utilisateur n'existe pas !");
        }

        let oldFirstname = oldUser.rows[0].firstname;
        if (newUser.firstname) {
            oldFirstname = newUser.firstname;
        }
        let oldLastname = oldUser.rows[0].lastname;
        if (newUser.lastname) {
            oldLastname = newUser.lastname;
        }
        let oldBirthday = oldUser.rows[0].birthday;
        if (newUser.birthday) {
            oldBirthday = newUser.birthday;
        }
        let oldPassword = oldUser.rows[0].password;
        if (newUser.password) {
            oldPassword = newUser.password;
        }
        let oldPhoneNumber = oldUser.rows[0].phone_number;
        if (newUser.phone_number) {
            oldPhoneNumber = newUser.phone_number;
        }
        let oldAddress = oldUser.rows[0].address;
        if (newUser.address) {
            oldAddress = newUser.address;
        }
        let oldPostalCode = oldUser.rows[0].postal_code;
        if (newUser.postal_code) {
            oldPostalCode = newUser.postal_code;
        }
        let oldCity = oldUser.rows[0].city;
        if (newUser.city) {
            oldCity = newUser.city;
        }
        let oldCountry = oldUser.rows[0].country;
        if (newUser.country) {
            oldCountry = newUser.country;
        }

        const query = {
            text: `UPDATE public."user"
                    SET
                        "firstname" = $1,
                        "lastname" = $2,
                        "birthday" = $3,
                        "password" = $4,
                        "phone_number" = $5,
                        "address" = $6,
                        "postal_code" = $7,
                        "city" = $8,
                        "country" = $9
                    WHERE "user"."email" = $10
                    RETURNING *;`,
            values: [oldFirstname, oldLastname, oldBirthday, oldPassword, oldPhoneNumber, oldAddress, oldPostalCode, oldCity, oldCountry, email]
        };
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas d'utilisateur correspondant!");
        }
        debugUserModelEnd("userModel valide updateOne");
        return result.rows[0];
    },

    /**
    * Supprime un utilisateur
    * @param {*} userEmail Email dans la session
    * @param {*} userId Id de la session
    * @returns retourne les données qui viennent d'âtre effacées dans la BDD.
    */
    async deleteOne(userEmail) {
        const query = {
            text: "DELETE FROM \"user\" WHERE \"email\" = $1 RETURNING \"firstname\", \"lastname\", \"birthday\", \"email\", \"password\", \"phone_number\", \"address\", \"postal_code\", \"city\", \"country\";",
            values: [userEmail]
        };
        debugUserModelStart("userModel check deleteOne");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Il n'y a pas d'utilisateur correspondant!");
        }
        debugUserModelEnd("userModel valide deleteOne");
        return result.rows;
    },

    /**
    * Verifie que l'utilisateur existe
    * @param {*} email Email dans le formulaire
    * @returns retourne l'utilisateur dont le mot de passe et l'adresse mail correspondaient.
    */
    async checkEmailPassword(email) {
        const query = {
            text: "SELECT * FROM \"user\" WHERE email = $1;",
            values: [email]
        };
        debugUserModelStart("userModel check checkEmailPassword");
        const result = await pool.query(query);
        if (!result.rowCount) {
            throw new Error("Le mot de passe et l'adresse mail ne correspondent pas!");
        }
        debugUserModelEnd("userModel valide checkEmailPassword");
        return result.rows[0];
    },
};
