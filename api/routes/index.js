const express = require("express");
const router = express.Router();

const address = require("./address");
const crypture = require("./crypture");
const battle = require("./battle");

router.use("/address", address);
router.use("/crypture", crypture);
router.use("/battle", battle);

module.exports = router;
