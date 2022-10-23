import jwt from "jsonwebtoken";
import { secret } from "../../config/config";
import { response } from "../../network";
// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express";

/**
 * Funcion que genera el token. Esta ahora se accede mendiante un request del parametro 
 * @param {Request} req 
 * @param {Response} res 
 */
const sign = (req, res) => {
	const payload = req.body;

	const signed = jwt.sign(payload, secret);

	return response({
		res,
		data: signed
	});
};

/**
 * Funcion que verifica si el token es valido
 * @param {string} token 
 */
const verify = (token) => jwt.verify(token, secret);

/**
 * Funcion que se ecangara de separar el token del header
 * @param {string} authorization
 * @param {Response} res
 * @returns {string} El token
 */
const getToken = (authorization, res) => {
	if (authorization === null) {
		response({
			res,
			ok: false,
			status: 403,
			data: { message: "Token not found" },
		});
	}

	if (authorization.indexOf("Bearer") === -1) {
		response({
			res,
			ok: false,
			status: 403,
			data: { message: "Format token invalid" },
		});
	}

	//?Bearer <token>
	const token = authorization.split(" ")[1];

	//?[Bearer, token]
	return token;
};

/**
 * Funcion que valida el token recibido
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const checkToken = (req, res, next) => {
	const authorization = req.headers.authorization || null;
	const token = getToken(authorization, res);
	const decoded = verify(token);

	//se valida si el decoded tiene algun error
	if (!decoded) {
		response({
			res,
			ok: false,
			status: 403,
			data: { message: "Invalid Token" },
		});
	}

	//se guarda el decoded en el request
	req.decoded = decoded;

	//si todo esta ok, se puede seguir
	next();
};

export { sign, checkToken };