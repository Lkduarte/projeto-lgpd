import { AppDataSource } from "../database/data-source";
import { Perfil } from "../entities";

const perfilRepository = AppDataSource.getRepository(Perfil);

export default perfilRepository;
