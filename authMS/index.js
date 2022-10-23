//archivo que se encarga de exponer la ruta del microservicio AUTH
import express from "express";
import { AUTH_PORT, DOMAIN } from "../config/config";
import authRouter from "./network.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.listen(AUTH_PORT, () => 
	console.log(`Auth MS on ${DOMAIN}:${AUTH_PORT}`)
);
