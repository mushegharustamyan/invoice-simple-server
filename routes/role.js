const express = require("express");
const router = express.Router();

const roleControllers = require("../controllers/role")

router.get("/" , roleControllers.index)

module.exports = router