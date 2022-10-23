// eslint-disable-next-line no-unused-vars
import { Document, Model } from "mongoose";

/**
 * Se encarga de listar los datos en base al modelo que recibe (es una Promesa)
 * @param {Model} model
 * @returns {Array} Datos encontrados
 */
export const list = async (model) => await model.find();

/**
 * Se encarga de guarda informacion
 * @param {Model} model
 * @param {Array<any>} data
 */
export const store = async (model, data) => {
	/**
	 * @type {Document}
	 */
	const object = new model(data);
	object.save();
};

/**
 * Funcion para buscar un dato en un modelo por la key y valor que recibe
 * @param {{model: Model, key: string, value: string}} parametros 
 */
export const findBy = async ({ model, key = "_id", value }) => {
	//la destructuracion es recomendable cuando se tenga mas de 2 parametros
	try {
		return await model.findOne({ [`${key}`]: value });
	} catch (err) {
		console.log(err);
		return false;
	}
};

/**
 * Funcion para actualizar datos x ID
 * @param {{model: Model, id: string, data: Object}} parametros
 * @returns {Array?}
 */
export const upsert = async ({ model, id, data }) => {
	try {
		//data es un objeto que tiene las columnas del modelo
		await model.findByIdAndUpdate(id, data);
		return list(model);
	} catch (err) {
		return false;
	}
};

/**
 * Funcion para eliminar un dato x ID
 * @param {Model} model
 * @param {String} id
 */
export const remove = async (model, id) => {
	try {
		await model.findByIdAndRemove(id);
		return list(model); //retorna la lista del modelo
	} catch (err) {
		return false;
	}
};
