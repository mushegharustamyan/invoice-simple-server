const { ADUser } = require("../../db/sequelize")
const { sendResBody, sendResStatus } = require("../../utils/helpers")

exports.index = (req , res) => {
    console.log("getting users")

    ADUser.findAll()
    .then((result) => sendResBody(res , 200 , result))
    .catch(_ => sendResStatus(res , 500))
}