const express = require("express");
const router = express.Router();

const adUsersControllers = require("../../controllers/admin/ad-users")

router.get("/" , adUsersControllers.index)

module.exports = router