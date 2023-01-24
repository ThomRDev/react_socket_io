const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const user = new User(req.body);

    // https://github.com/ThomRoman/learning_nest/blob/main/005-teslo-shop/src/seed/data/seed-data.ts

    // default 10
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);
    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    const passwordIsCorrect = bcrypt.compareSync(password, userExists.password);
    if (!passwordIsCorrect) {
      return res.status(404).json({
        ok: false,
        msg: "Password no es correcto",
      });
    }

    const token = await generateJWT(userExists.id);
    res.json({
      ok: true,
      user: userExists,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const reNewToken = async (req, res) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const user = await User.findById(uid);
  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  reNewToken,
  login,
  createUser,
};
