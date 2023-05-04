const {signin} = require("../controllers/auth")
const { verifyAccountent , verifyDepartmentEmployee} = require("../middlewares/verifications")
const accountantRouter = require("../routes/accountant/invoice")
const departmentInvoiceRouter = require("../routes/department/invoice")

exports.configureRouter = (app) => {
  app.use("/auth" , signin)

  // accountant
  app.use("/accountant/invoices" , verifyAccountent , accountantRouter)

  // department employee

  app.use("/department/invoices" , verifyDepartmentEmployee , departmentInvoiceRouter)
}