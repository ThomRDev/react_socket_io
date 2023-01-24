const jwt = require("jsonwebtoken");
const { checkJWT } = require("../helpers/jwt");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la petición",
      });
    }

    const [isCorrect, uid] = checkJWT(token);
    if (!isCorrect) {
      throw new Error();
    }
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no es válido",
    });
  }
};

module.exports = {
  validateJWT,
};
