const { Router } = require("express");
const { getChat } = require("../controllers/message");
const { validateJWT } = require("../middlewares/validateJwt");
const router = Router();

router.get("/:to", validateJWT, getChat);

module.exports = router;
