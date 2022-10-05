import { Router } from "express";
import {
  createNewUser,
  getDataUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/user.controllers.js";
import {
  validateLogin,
  validateRegister,
  validateUpdatedFields,
} from "../middlewares/userScheme-validate.js";

import validateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/auth", validateJWT, getDataUser);

router.post("/register", validateRegister(), createNewUser);

router.post("/login", validateLogin(), loginUser);

router.put("/auth/:id", validateUpdatedFields(), updateUser);

router.get("/auth/:id", getUser);

export default router;
