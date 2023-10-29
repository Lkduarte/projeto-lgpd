import { OptionType } from "../models/enums/OptionTypeEnum";

export default interface Term {
  _id: string;
  description: string;
  options: Option[];
  date: Date;
  isActual: boolean;
}

export interface Option {
  _id: string;
  type: OptionType;
  description: string;
}
