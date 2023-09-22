import { AppDataSource } from "../database/data-source";
import { AcessosUsuario } from "../entities";

const acessosUsuarioRepository = AppDataSource.getRepository(AcessosUsuario);

export default acessosUsuarioRepository;
