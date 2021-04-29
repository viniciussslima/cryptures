const express = require("express");

const router = express.Router();

const { getAllController } = require("./controller");

router.get("/cryptures/:address", getAllController);

module.exports = router;
