import { OptionType } from "../models/enums/OptionTypeEnum";

export default interface Term {
  _id: string;
  description: string;
  options: Option[];
}

export interface Option {
  _id: string;
  type: OptionType;
  description: string;
}
