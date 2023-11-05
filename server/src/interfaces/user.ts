export default interface User {
  _id: string;
  email: string; // Encrypted
  password: string; // Encrypted
  data: UserData; // Encrypted
  signedTerms: SignedTerm[];
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
