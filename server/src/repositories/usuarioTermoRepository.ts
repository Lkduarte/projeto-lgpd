import { AppDataSource } from "../database/data-source";
import { UsuarioTermo } from "../entities/UsuarioTermo";

const usuarioTermoRepository = AppDataSource.getRepository(UsuarioTermo);

export default usuarioTermoRepository;
