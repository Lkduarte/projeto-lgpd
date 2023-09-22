import { Repository } from "typeorm";
import { Termo } from "../entities";
import { termoRepository } from "../repositories";

class TermoService {
  repository: Repository<Termo> = termoRepository;

  public getById = (id: string): Promise<Termo | null> => {
    return this.repository.findOneBy({ termo_id: id });
  };

  public getAtual = (): Promise<Termo | null> => {
    return this.repository.findOneBy({ isAtual: true });
  };

  public save = async (termo: Termo): Promise<Termo> => {
    this.repository.update({ isAtual: true }, { isAtual: false });

    termo.isAtual = true;
    const term = this.repository.save(termo);
    return term;
  };

  public update = (termo: Termo): Promise<Termo> => {
    return this.repository.save(termo);
  };

  public list = (): Promise<Termo[]> => {
    return this.repository.find();
  };
}

const termoService = new TermoService();
export default termoService;
