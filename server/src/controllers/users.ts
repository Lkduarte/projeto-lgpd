import express from "express";

import {
  deleteUserById,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
} from "../services/userServices";
import { authentication, random } from "../helpers";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to get all users",
    });
  }
};

export const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `An error occurred when tried to get user by id - User not found for ID: ${id}`,
    });
  }
};

export const getByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.params;

    const user = await getUserByEmail(email);

    return res.status(200).json(user);
  } catch (error) {
    res.json(400).json({
      message: "An error occurred when tried to get user by email",
      error: error,
    });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, data } = req.body;

    if (!email || !password || !data) {
      return res.status(400).json({
        message: "email, password and data are required for registration",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = random();
    const user = await createUser({
      email,
      data,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred when tried to create user",
    });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to delete User",
      error: error,
    });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        message: "data is required for this operation",
      });
    }

    const user = await getUserById(id);

    user.data = data;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to update user",
    });
  }
};
