//* Import de bcrypt
import bcrypt from "bcrypt";

export default async (password,userPasswordToCheck) => {
    //? Compare les 2 mots de passe et retourne === true // false
    return await bcrypt.compare(password.toString(), userPasswordToCheck.toString());
};
