require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectionInit = require("./db/init")
const { sequelize } = require("./db/sequelize")
const { createRoles, createAccountant, createDepEmployee, createAdmin } = require("./db/migrations")

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

const port = 5001

app.listen(port,() => {
  console.log("listen 5001")
  connectionInit()
  .then(_ => {
    sequelize.sync({ alter: false, force: false })
    .then(_ => createRoles().then(_ => {
      createAdmin()
      createAccountant()
      createDepEmployee()
    }))
  })
})