import { AppDataSource } from "../database/data-source";
import { Endereco } from "../entities";

const enderecoRepository = AppDataSource.getRepository(Endereco);

export default enderecoRepository;
