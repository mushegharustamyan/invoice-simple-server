const express = require("express");
const router = express.Router();

const adUsersControllers = require("../../controllers/admin/ad-users")

router.get("/" , adUsersControllers.index)
router.post("/:id" , adUsersControllers.add)

module.exports = router