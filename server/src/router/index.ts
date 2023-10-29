import express from "express";

import authentication from "./authentication";
import users from "./users";
import terms from "./terms";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  terms(router);

  return router;
};
