const { Op, where } = require("sequelize")
const { Invoice , User } = require("../../db/sequelize")
const { sendResStatus } = require("../../utils/helpers")
const jwt = require("jsonwebtoken")

exports.index = (req , res) => {
  const {startDate , endDate} = req.body
  const {token} = req.headers
  const {userId} = jwt.decode(token)

  User.findByPk(userId)
  .then((user) => {
    Invoice.findAll({
      where: {
        date: {
          [Op.between]: [
            startDate ? startDate : "01/01/1900",
            endDate ? endDate : "31/12/9999",
          ],
        },
        where: {
          departmentId: user.departmentId
        }
      }
    })
    .then((result) => sendResStatus(res ,200 , result))
    .catch(_ => sendResStatus(res , 500))
  })
}

exports.approve = (req , res) => {
  const {id} = req.params

  Invoice.update({status: "signed"},{where: {id}})
  .then(_ => sendResStatus(res , 204))
  .catch(_ => sendResStatus(res , 500))
}

exports.reject = (req , res) => {
  const { reason } = req.body
  const { id } = req.params

  const body = {id , status: "error"}

  if(reason) body.error = reason

  Invoice.update(body , {where: {id}})
  .then(_ => sendResStatus(res , 204))
  .catch(_ => sendResStatus(res , 500))
}