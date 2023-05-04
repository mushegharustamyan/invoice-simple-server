const { Op } = require("sequelize")
const { Invoice } = require("../../db/sequelize")
const { sendResStatus } = require("../../utils/helpers")

exports.index = (req , res) => {
  const {startDate , endDate} = req.body

  Invoice.findAll({
    where: {
      date: {
        [Op.between]: [
          startDate ? startDate : "01/01/1900",
          endDate ? endDate : "31/12/9999",
        ],
      },
    }
  })
  .then((result) => sendResStatus(res ,200 , result))
  .catch(_ => sendResStatus(res , 500))
}