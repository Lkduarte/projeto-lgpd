import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  data: string;
  authentication: UserAuthentication;
}

export interface IKey extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  key: string;
}

interface UserAuthentication {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface UserData {
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
