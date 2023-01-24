const { Router } = require("express");
const { login, createUser, reNewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJwt");
const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "El password es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    validateFields,
  ],
  createUser
);
router.post(
  "/login",
  [
    check("password", "El password es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    validateFields,
  ],
  login
);
router.get("/renew", [validateJWT], reNewToken);

module.exports = router;
