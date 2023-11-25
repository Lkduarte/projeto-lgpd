import { Key } from "../index";

export const getKeyById = (id: string) => Key.findOne({ userId: id });

export const createKey = (values: Record<string, any>) =>
  new Key(values).save().then((user) => user.toObject());

export const deleteKeyByUserId = (id: string) =>
  Key.findOneAndDelete({ userId: id });
