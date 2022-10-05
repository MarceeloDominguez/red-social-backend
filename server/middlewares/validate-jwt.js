import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const payload = jwt.verify(token, "palabraSecreta");

    req._id = payload.uid;
    req.name = payload.name;
    req.image = payload.image;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

export default validateJWT;
