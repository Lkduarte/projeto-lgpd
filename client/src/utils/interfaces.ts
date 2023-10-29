interface IUser {
  _id: string | undefined | null;
  email: string;
  password: string;
  passwordConfirmation: string;
  data: IUserData;
  signedTerms: ISignedTerm[];
}

interface IUserData {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  address: IAddress;
}

interface IAddress {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

interface ISignedTerm {
  termId: string;
  isAccepted: boolean;
  date: Date;
  signedOptions: ISignedOption[];
}

interface ISignedOption {
  optionId: string;
  isAccepted: boolean;
}

interface ITerm {
  _id: string;
  description: string;
  options: IOption[];
}

interface IOption {
  _id: string;
  description: string;
}

export type {
  IAddress,
  IOption,
  ISignedOption,
  ISignedTerm,
  ITerm,
  IUserData,
  IUser,
};

interface IUserRegister {
  email: string;
  password: string;
  passwordConfirmation: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: IEndereco;
  termo_id: string;
  permiteReceberEmailPromocoes: boolean;
  permiteReceberEmailInfos: boolean;
  assinouTermo: boolean;
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

interface ITermo {
  termo_id: string;
  nomeTermo: string;
}

interface IUserValidation {
  email: boolean;
  password: boolean;
  passwordConfirmation: boolean;
  nomeCompleto: boolean;
  cpf: boolean;
  telefone: boolean;
  endereco: IEnderecoValidation;
}

interface IEnderecoValidation {
  cep: boolean;
  rua: boolean;
  numero: boolean;
  complemento: boolean;
  bairro: boolean;
  cidade: boolean;
  estado: boolean;
}
interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}
interface ProductProps {
  product: Product;
}

export type {
  IUserRegister,
  IEndereco,
  IUserValidation,
  ITermo,
  Product,
  ProductProps,
};
