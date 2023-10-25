import { DeleteResult, Repository } from "typeorm";
import { Endereco } from "../entities";
import { enderecoRepository } from "../repositories";

class EnderecoService {
  repository: Repository<Endereco> = enderecoRepository;

  public getById = (endereco_id: string): Promise<Endereco | null> => {
    return this.repository.findOne({
      where: { endereco_id },
    });
  };

  public save = (endereco: Endereco): Promise<Endereco> => {
    return this.repository.save(endereco);
  };

  public update = (endereco: Endereco): Promise<Endereco> => {
    return this.repository.save(endereco);
  };

  public list = (): Promise<Endereco[]> => {
    return this.repository.find();
  };

  public deleteById = (endereco_id: string): Promise<DeleteResult> => {
    return this.repository.delete({ endereco_id });
  };
}

const enderecoService = new EnderecoService();
export default enderecoService;
