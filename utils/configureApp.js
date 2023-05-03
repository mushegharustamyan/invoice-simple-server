const {signin} = require("../controllers/auth")

const configureRouter = (app) => {
  app.use("/auth" , signin)
}

exports.module = configureRouter