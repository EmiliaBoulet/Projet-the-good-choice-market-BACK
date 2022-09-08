import bcrypt from "bcrypt";

//? Fonction de bcrypt pour chiffrer le mdp
export default async (password) => {
    const mdp = password;
    mdp.toString();
    const salt = await bcrypt.genSalt(10); //* Generation du chiffrage
    const hash = await bcrypt.hash(mdp, salt); //* Melange du mdp et du chiffrage
    return hash; //* On retourne le resultat
};
