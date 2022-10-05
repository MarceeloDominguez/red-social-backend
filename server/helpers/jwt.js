import jwt from "jsonwebtoken";
import { PALABRA_SECRETA } from "../config.js";

export const generarJWT = (uid, name, image) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, image };

    jwt.sign(payload, PALABRA_SECRETA, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token");
      }
      resolve(token);
    });
  });
};
