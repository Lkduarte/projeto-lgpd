import { AppDataSource } from "../database/data-source";
import { Termo } from "../entities";

const termoRepository = AppDataSource.getRepository(Termo);

export default termoRepository;
