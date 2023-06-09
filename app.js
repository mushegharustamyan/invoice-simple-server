require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectionInit = require("./db/init")
const { sequelize } = require("./db/sequelize")
const { createRoles, createAccountant, createDepEmployee, createAdmin, createAdUsers, createInvoices } = require("./db/migrations")
const {configureRouter} = require("./utils/configureApp")

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

configureRouter(app)

const port = 5001

app.listen(port,() => {
  console.log("listen 5001")
  connectionInit()
  .then(_ => {
    sequelize.sync({ alter: false, force: true })
    .then(_ => createRoles().then( async (_) => {
      await createAdmin()
      await createAccountant()
      await createDepEmployee()
      await createAdUsers()
      createInvoices()
    }))
  })
})