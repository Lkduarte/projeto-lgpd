export default interface User {
  _id: string;
  email: string;
  data: UserData; // Encrypted
  authentication: UserAuthentication;
  signedTerms: SignedTerm[];
}

interface UserAuthentication {
  password: string;
  salt: string;
  sessionToken: string;
}

interface UserData {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  address: address;
}

interface address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

interface SignedTerm {
  userId: string;
  isAccepted: boolean;
  date: Date;
  signedOptions: SignedOption[];
}

interface SignedOption {
  optionId: string;
  signs: Sign[];
}

interface Sign {
  date: Date;
  isAccepted: boolean;
}
