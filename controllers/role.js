const { Role } = require("../db/sequelize")
const { sendResBody, sendResStatus } = require("../utils/helpers")

exports.index = (req , res) => {
    console.log("getting role")

    Role.findAll()
    .then((roles) => sendResBody(res , 200 , roles))
    .catch(() => sendResStatus(res , 500))
}