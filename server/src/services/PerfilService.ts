import { DeleteResult, Repository } from "typeorm";
import { Perfil } from "../entities";
import { perfilRepository } from "../repositories";

class PerfilService {
  repository: Repository<Perfil> = perfilRepository;

  public getById = (perfil_id: string): Promise<Perfil | null> => {
    return this.repository.findOne({
      where: { perfil_id },
      relations: { usuario: true },
    });
  };

  public findByCpf = (cpf: string): Promise<Perfil | null> => {
    return this.repository.findOne({
      where: { cpf },
      relations: { usuario: true },
    });
  };

  public getByTelefone = (telefone: string): Promise<Perfil | null> => {
    return this.repository.findOne({
      where: { telefone },
      relations: { usuario: true },
    });
  };

  public save = (perfil: Perfil): Promise<Perfil> => {
    return this.repository.save(perfil);
  };

  public update = (perfil: Perfil): Promise<Perfil> => {
    return this.repository.save(perfil);
  };

  public list = (): Promise<Perfil[]> => {
    return this.repository.find({ relations: { usuario: true } });
  };

  public deleteById = (perfil_id: string): Promise<DeleteResult> => {
    return this.repository.delete({ perfil_id });
  };
}

const perfilService = new PerfilService();
export default perfilService;
