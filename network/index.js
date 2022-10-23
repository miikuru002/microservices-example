// eslint-disable-next-line no-unused-vars
import { Response } from "express";

/**
 * Funcion para devolver respuestas segun el response
 * @param {{res: Response, ok: boolean, status: number, data: {message: string}}} param0 
 */
export const response = ({ res, ok = true, status = 200, data }) => {
	res.status(status).json({
		ok,
		data,
	});
};
