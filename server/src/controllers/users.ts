import express from "express";

import {
  deleteUserById,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
} from "../services/userServices";
import { authentication, random } from "../helpers";
import { getCurrentTerm } from "../services/termServices";

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
    const { email, password, data, signedTerms } = req.body;

    if (!email || !password || !data || !signedTerms) {
      return res.status(400).json({
        message:
          "email, password, signedTerms and data are required for registration",
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
      signedTerms,
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

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res.status(400).json({
        message: "old and new password are required for this operation",
      });
    }

    const user = await getUserById(id).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

    const salt = random();

    user.authentication.salt = salt;
    user.authentication.password = authentication(salt, newPassword);

    await user.save();

    return res.status(200).end();
  } catch (e) {
    return res.status(400).json({
      message: "An error occurred when tried to update user password",
    });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { data, password } = req.body;

    if (!data || !password) {
      return res.status(400).json({
        message: "data and password are required for this operation",
      });
    }

    const user = await getUserById(id).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

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

export const signCurrentTerm = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { signedTerm } = req.body;

    if (!id || !signedTerm) {
      return res.status(400).json({
        message: "signedTerm and user id are required for this operation",
      });
    }

    const user = await getUserById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.signedTerms.push(signedTerm);

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred when tried to sign current term",
    });
  }
};

export const hasSignedCurrentTerm = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTerm = await getCurrentTerm();

    if (!currentTerm) {
      return res.status(200).json(null).end();
    }

    const hasSignedCurrentTerm =
      user.signedTerms.filter((x) => x.termId === currentTerm._id).length !== 0;
    if (!hasSignedCurrentTerm) {
      return res.status(200).json(currentTerm);
    }

    return res.status(200).json(null).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to update user",
    });
  }
};
