import { Endereco } from "../entities";

interface IUsuario {
  usuario_id: string;
  email: string;
  password: string;
  permiteReceberEmailPromocoes: boolean;
  permiteReceberEmailInfos: boolean;
  perfil: IPerfil;
  termosAssinados: IUsuarioTermo[];
}

interface IPerfil {
  usuario_id: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: IEndereco;
}

interface IEndereco {
  usuario_id: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface ITermo {
  termo_id?: string;
  isAtual: boolean;
  nomeTermo: string;
  usuariosAssinantes?: IUsuarioTermo[];
}

interface IUsuarioTermo {
  usuario_id: string;
  termo_id: string;
  aceito: boolean;
  usuario?: IUsuario;
  termo?: ITermo;
}

interface IRegistro {
  email: string;
  password: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
  termo_id: string;
  permiteReceberEmailInfos: boolean;
  permiteReceberEmailPromocoes: boolean;
}

interface IAcessosUsuario {
  id: string;
  usuario: IUsuario;
  enderecoIp: string;
  data_hora: Date;
}

export {
  IUsuario,
  IPerfil,
  IEndereco,
  ITermo,
  IUsuarioTermo,
  IRegistro,
  IAcessosUsuario,
};
