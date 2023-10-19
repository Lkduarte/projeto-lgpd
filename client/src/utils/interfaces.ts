interface IUserRegister {
  email: string;
  password: string;
  passwordConfirmation: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: IEndereco;
}

interface IEndereco {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface IUserValidation {
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  nomeCompleto: string | null;
  cpf: string | null;
  telefone: string | null;
  endereco: IEnderecoValidation;
}

interface IEnderecoValidation {
  cep: string | null;
  rua: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
}

export type { IUserRegister, IEndereco, IUserValidation };
