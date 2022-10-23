import mongoose from "mongoose";

//mongoose scope global
mongoose.Promise = global.Promise;

/**
 * Funcion para hacer la conexión a la base de datos
 * @param {string} url
 */
const connect = async (url) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
	});

	console.log(">>>MONGODB Connected");
};

export default connect;