import { DataSource } from "typeorm";
import "dotenv/config";
import { AcessosUsuario, Perfil, Termo, Usuario } from "../entities";
import { Default1695213936065 } from "./migrations/1695213936065-default";

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Usuario, Termo, Perfil, AcessosUsuario],
  migrations: [Default1695213936065],
  maxQueryExecutionTime: 2000,
});
