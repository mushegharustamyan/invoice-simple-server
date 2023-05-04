const { User } = require("../db/sequelize")
const jwt = require("jsonwebtoken")
const { sendResStatus } = require("../utils/helpers")
const { Role } = require("../db/sequelize")


exports.verifyAccountent = (req , res , next) => {
  const { token } = req.headers

  const {id} = jwt.decode(token)

  User.findByPk(id)
  .then((user) => {
    if(!user) return sendResStatus(res , 400)

    Role.findByPk(user.roleId)
    .then((role) => {
      if(role.access_level !== 2) return sendResStatus(res , 403)

      next()
    })
    .catch(_ => sendResStatus(res , 500))
  })
  .catch(_ => sendResStatus(res, 500))
}

exports.verifyDepartmentEmployee = (req , res, next) => {
  const { token } = req.headers

  const {id} = jwt.decode(token)

  User.findByPk(id)
  .then((user) => {
    if(!user) return sendResStatus(res , 400)

    Role.findByPk(user.roleId)
    .then((role) => {
      if(role.access_level !== 3) return sendResStatus(res , 403)

      next()
    })
    .catch(_ => sendResStatus(res , 500))
  })
  .catch(_ => sendResStatus(res, 500))
}