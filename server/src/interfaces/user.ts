export default interface User {
  _id: string;
  email: string; // Encrypted
  password: string; // Encrypted
  data: UserData; // Encrypted
  signedTerms: SignedTerm[];
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
