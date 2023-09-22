import { DeleteResult, Repository } from "typeorm";
import { Perfil } from "../entities";
import { perfilRepository } from "../repositories";

class PerfilService {
  repository: Repository<Perfil> = perfilRepository;

  public getById = (usuario_id: string): Promise<Perfil | null> => {
    return this.repository.findOne({
      where: { usuario_id },
      relations: { usuario: true },
    });
  };

  public getByEmail = (email: string): Promise<Perfil | null> => {
    return this.repository.findOne({
      where: { email },
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

  public deleteById = (usuario_id: string): Promise<DeleteResult> => {
    return this.repository.delete({ usuario_id });
  };
}

const perfilService = new PerfilService();
export default perfilService;
