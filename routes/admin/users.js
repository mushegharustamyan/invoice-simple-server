const express = require("express");
const router = express.Router();

const usersControllers = require("../../controllers/admin/user")

router.get("/" , usersControllers.index)
router.put("/:id", usersControllers.changeRole)
router.delete("/:id", usersControllers.delete)

module.exports = router