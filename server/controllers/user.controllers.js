import { uploadImage } from "../helpers/claudinary.js";
import User from "../models/User.js";
import fs from "fs-extra";
import { generarJWT } from "../helpers/jwt.js";
import bcrypt from "bcryptjs";

export const getDataUser = async (req, res) => {
  try {
    const { name, image, _id } = req;

    const token = await generarJWT(_id, name, image);

    res.json({ ok: true, name, token, _id, image });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { _id, name, email, password } = req.body;
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      image = { url: result.secure_url, public_id: result.public_id };

      //elimina img de ./upload
      await fs.remove(req.files.image.tempFilePath);
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe.",
      });
    }

    user = new User({ _id, name, image, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generarJWT(user._id, user.name, user.image);

    return res.json({
      ok: true,
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      password: user.password,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe ese email",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password es incorrecto",
      });
    }

    const token = await generarJWT(user._id, user.name, user.image);

    return res.json({
      ok: true,
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      req.body.image = { url: result.secure_url, public_id: result.public_id };

      //elimina img de ./upload
      await fs.remove(req.files.image.tempFilePath);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const { id, name, image } = updatedUser;

    const token = await generarJWT(id, name, image);

    return res.json({
      ok: true,
      id,
      name,
      image,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
