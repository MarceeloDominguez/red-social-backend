import { check } from "express-validator";
import { validateFields } from "./validate-fields.js";

export const validateRegister = () => {
  return [
    check("name", "El nombre es requerido. Max 4 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    check("email", "El email es requerido").isEmail(),
    check("password", "El password dede tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ];
};

export const validateLogin = () => {
  return [
    check("email", "El email es requerido").isEmail(),
    check("password", "El password dede tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ];
};

export const validateUpdatedFields = () => {
  return [
    check("name", "El nombre es requerido. Max 4 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    validateFields,
  ];
};
