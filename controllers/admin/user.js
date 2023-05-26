const { User, Role } = require("../../db/sequelize")
const { sendResStatus, sendResBody } = require("../../utils/helpers")

exports.delete = (req ,res) => {
    const {id} = req.params

    User.destroy({where: {id}})
    .then(() => sendResStatus(res , 204 ))
    .catch(() => sendResStatus(res , 500))
}

exports.changeRole = (req , res) => {
    const {id} = req.params
    const {roleId} = req.body

    console.log(id , roleId)

    User.update({roleId} , {where: {id}})
    .then(() => sendResStatus(res , 204))
    .catch(() => sendResStatus(res , 500))
}

exports.index = (req , res) => {
    User.findAll({include: Role})
    .then((result) => sendResBody(res , 200 , result))
    .catch(() => sendResStatus(res , 500))
}