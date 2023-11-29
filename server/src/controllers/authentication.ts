import express from "express";

import { getUserById, getUserIdByEmail } from "../services/userServices";
import { authentication, decryption, random } from "../helpers";
import { getKeyById } from "../services/keyServices";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required for this operation",
      });
    }

    const userId = getUserIdByEmail(email);

    if (!userId) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

    const user = await getUserById(userId._id).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).json({
        message: "user not found for this email",
      });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

    const key = await getKeyById(user._id);

    if (!key) return res.status(404).json({ message: "user not found" });

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("USER-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    const userObject = {
      _id: user._id,
      data: decryption(key.key, user.data),
    };

    return res.status(200).json(userObject).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to login",
      error: error,
    });
  }
};
