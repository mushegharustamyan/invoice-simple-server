const express = require("express");
const router = express.Router();

const acountantControllers = require("../../controllers/accountant/invoices")

router.get("/" , acountantControllers.index)

module.exports = router