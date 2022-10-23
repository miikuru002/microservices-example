//este archivo se encaga de exportar variables

export const base_url = "/api/v1";

export const DOMAIN = process.env.DOMAIN || "http://localhost";

export const port = process.env.PORT || 8090;

export const AUTH_PORT = process.env.AUTH_PORT || 5000;

export const secret = process.env.SECRET || "secret";

const mongo_local = "mongodb://localhost/local";

export const db_url = process.env.DB_URL || mongo_local;
