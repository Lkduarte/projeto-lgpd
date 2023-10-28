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
