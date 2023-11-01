import express from "express";
import { merge, get } from "lodash";

import { getUserBySessionToken } from "../services/userServices";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["USER-AUTH"];

    if (!sessionToken) {
      return res.status(403).json({
        message: "User unauthenticated",
      });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({
        message: "User not found for this session token",
      });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to check if user is authenticated",
      error: error,
    });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as unknown as string;

    if (!currentUserId) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

    if (currentUserId.toString() !== id) {
      return res.status(403).json({
        message: "User can't delete himself",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to check if user is owner",
      error,
    });
  }
};
