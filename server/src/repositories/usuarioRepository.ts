import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export default usuarioRepository;
