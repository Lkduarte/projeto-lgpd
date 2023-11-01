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
  name: string; // Encrypted
  lastName: string; // Encrypted
  cpf: string; // Encrypted
  phone: string; // Encrypted
  address: address; // Encrypted
}

interface address {
  cep: string; // Encrypted
  street: string; // Encrypted
  number: string; // Encrypted
  complement: string; // Encrypted
  neighborhood: string; // Encrypted
  city: string; // Encrypted
  state: string; // Encrypted
  country: string; // Encrypted
}

interface SignedTerm {
  termId: string;
  isAccepted: boolean;
  date: Date;
  signedOptions: SignedOption[];
}

interface SignedOption {
  optionId: string;
  isAccepted: boolean;
}
