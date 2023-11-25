import { Term } from "../index";

export const getTerms = () => Term.find();

export const getCurrentTerm = () => Term.findOne({ isActual: true });

export const getTermById = (id: string) => Term.findById(id);

export const createTerm = async (values: Record<string, any>) => {
  const newTerm = new Term(values).save().then((Term) => Term.toObject());
  newTerm.then((r) =>
    Term.updateMany({ _id: { $ne: r._id } }, { $set: { isActual: false } })
  );
};

export const updateTermById = (id: string, values: Record<string, any>) =>
  Term.findByIdAndUpdate(id, values);

export const deleteTermById = (id: string) =>
  Term.findOneAndDelete({ _id: id });
