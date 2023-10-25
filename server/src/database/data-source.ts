import { DataSource } from "typeorm";
import "dotenv/config";
import {
  AcessosUsuario,
  Endereco,
  Perfil,
  Termo,
  Usuario,
  UsuarioTermo,
} from "../entities";
import { Default1698237107125 } from "./migrations/1698237107125-default";

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Usuario, Termo, Perfil, AcessosUsuario, UsuarioTermo, Endereco],
  migrations: [Default1698237107125],
  maxQueryExecutionTime: 2000,
  synchronize: true,
});
