const express = require("express");
const router = express.Router();

const departmentControllers = require("../../controllers/department/invoice")

router.get("/" , departmentControllers.index)

module.exports = router