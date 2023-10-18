interface IUsuario {
  usuario_id?: string;
  nomeUsuario: string;
  password: string;
  permiteReceberEmailInfos: boolean;
  permiteReceberEmailPromocoes: boolean;
}

interface ITermo {
  termo_id?: string;
  isAtual: boolean;
  nomeTermo: string;
}

interface IUsuarioTermo {
  termo_id: string;
  usuario_id: string;
  aceito: boolean;
}

export { IUsuario, ITermo, IUsuarioTermo };
