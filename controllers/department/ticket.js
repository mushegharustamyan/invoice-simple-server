const { Op } = require("sequelize")
const { Ticket } = require("../../db/sequelize")
const {sendResStatus, sendResBody} = require("../../utils/helpers")

exports.create = (req , res) => {
  const {description} = req.body

  Ticket.create({description})
  .then(_ => sendResStatus(res, 204))
  .catch(_ => sendResStatus(res, 500))
}

exports.index = (req , res) => {
  const {startDate , endDate} = req.body

  Ticket.findAll({where: {
    date: {
      [Op.between]: [
          startDate ? startDate : "01/01/1900",
          endDate ? endDate : "31/12/9999",
        ],
    }
  }})
  .then((result) => sendResBody(res , 200 , result))
  .catch(_ => sendResStatus(res , 500))
}