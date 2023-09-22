import { Repository } from "typeorm";
import { AcessosUsuario } from "../entities";
import { acessosUsuarioRepository } from "../repositories";

class AcessosUsuarioService {
  repository: Repository<AcessosUsuario> = acessosUsuarioRepository;

  public save = (AcessosUsuario: AcessosUsuario): Promise<AcessosUsuario> => {
    return this.repository.save(AcessosUsuario);
  };

  public listByUsuario = (usuario_id: string): Promise<AcessosUsuario[]> => {
    return this.repository.find({
      where: { usuario: { usuario_id } },
      relations: { usuario: true },
      order: { data_hora: "DESC" },
    });
  };
}

const acessosUsuarioService = new AcessosUsuarioService();
export default acessosUsuarioService;
