import bcrypt from "bcryptjs";

/**
 * Funcion para hashear el password
 * @param {string} password
 */
export const hash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);
	return hashPassword;
};

/**
 * Funcion para comparar el password
 * @param {string} password
 * @param {string} hash
 * @return {boolean}
 */
export const compare = (password, hash) => bcrypt.compareSync(password, hash);
