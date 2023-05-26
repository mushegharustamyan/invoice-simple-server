const { ADUser, User } = require("../../db/sequelize")
const { sendResBody, sendResStatus } = require("../../utils/helpers")

exports.index = (req , res) => {
    console.log("getting users")

    ADUser.findAll()
    .then((result) => sendResBody(res , 200 , result))
    .catch(_ => sendResStatus(res , 500))
}

exports.add = (req , res) => {
    const {id} = req.params
    const {roleId} = req.body 

    ADUser.findByPk(id)
    .then((user) => {
        if(!user) return sendResStatus(res , 404)

        const {createdAt , updatedAt , id , ...body} = user.dataValues

        User.create({...body , roleId})
        .then(() => sendResStatus(res , 201))
        .catch((e) => { 
            console.log(e)
            sendResStatus(res , 500)
        })
    })
    .catch(() => sendResStatus(res , 500))
}
