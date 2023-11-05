import express from "express";
import {
  createTerm,
  deleteTermById,
  getCurrentTerm,
  getTermById,
  getTerms,
} from "../services/termServices";

export const getAllTerms = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const terms = await getTerms();

    return res.status(200).json(terms);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to get all terms",
    });
  }
};

export const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  try {
    const term = await getTermById(id);
    console.log(term);
    if (!term) {
      return res.status(404).json({
        message: "Term not found",
      });
    }

    return res.status(200).json(term);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `An error occurred when tried to get term by id - Term not found for ID: ${id}`,
    });
  }
};

export const getCurrent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const term = await getCurrentTerm();
    const { usersSigned, ...termo } = term;

    return res.status(200).json(termo);
  } catch (error) {
    res.json(400).json({
      message: "An error occurred when tried to get current term",
      error: error,
    });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { description, options } = req.body;

    if (!description || !options) {
      return res.status(400).json({
        message: "description and options are required for registration",
      });
    }

    const term = await createTerm({
      description,
      options,
      isActual: true,
      date: new Date(),
      usersSigned: [],
    });

    return res.status(200).json(term).end();
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred when tried to create term",
    });
  }
};

export const deleteTerm = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedTerm = await deleteTermById(id);

    return res.json(deletedTerm);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to delete Term",
      error: error,
    });
  }
};
