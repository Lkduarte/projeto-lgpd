import { DataSource } from "typeorm";
import "dotenv/config";
import { AcessosUsuario, Perfil, Termo, Usuario } from "../entities";
import { UsuarioTermo } from "../entities/UsuarioTermo";
import { Default1697634879368 } from "./migrations/1697634879368-default";

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Usuario, Termo, Perfil, AcessosUsuario, UsuarioTermo],
  migrations: [Default1697634879368],
  maxQueryExecutionTime: 2000,
});
