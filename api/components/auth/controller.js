//import { sign } from "../../../auth";
import { store, findBy } from "../../../store/dummy";
import { response } from "../../../network";
import { hash, compare } from "../../../helper/encrypt";
import userModel from "../user/model";
// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express";
import axios from "axios";

/**
 * Funcion que realiza el inicio de sesion
 * @param {Request} req 
 * @param {Response} res 
 * @returns {object} Retorna al usuario con su token
 */
export const login = async (req, res) => {
	const user = req.body; //destructuracion

	//el payload se envia a sign() para ser parte de la creacion del token
	const payload = { 
		email: user.email,
		password: user.password
	};

	let token = "";

	//se debe hacer un request a localhost:5000/auth/sign y devolver el token
	//se debe pasar el payload como el body
	await axios.post("http://localhost:5000/auth/sign", payload)
		.then(response => token = response.data.data);	

	//se busca al usario
	const userData = await findBy({ model: userModel, key: "email", value: user.email });

	//verificar si existe el usuario
	if (!userData)  {
		return response({
			res,
			ok: false,
			status: 500,
			data: { message: "User doesn't exist" }
		});
	}

	const validate = compare(user.password, userData.password);
	
	//si las contrseñas son diferenes
	if (!validate) {
		return response({
			res,
			ok: false,
			status: 500,
			data: { message: "Incorrect password" }
		});
	}

	return response({
		res,
		data: { user, token },
	});
};

/**
 * Funcion que crea la data del usuario nuevo
 * @param {Request} req 
 * @param {Response} res 
 */
export const signUp = async (req, res) => {
	const user = req.body;

	const data = {
		name: user.name,
		last_name: user.last_name,
		email: user.email,
		password: hash(user.password),
	};

	const users = await store(userModel, data);

	return response({ res, data: users, status: 201 });
};
