const jwt = require("jsonwebtoken")
const { User, Role } = require("../db/sequelize")
const { sendResStatus } = require("../utils/helpers")

exports.signin = (req, res) => {
	const { email, password } = req.body

	console.log(email , password)

	User.findOne({
		where: {
			email,
		},
		include: Role
	})
		.then(async user => {
			if (!user || password !== user.password) {
				return sendResStatus(res, 409, "Invalid Email or Password")
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: 80000
			})

			return res.send({ token , user})
		})
		.catch(e => {
			console.log(e)
			sendResStatus(res, 404 , "Invalid Email or password")
		})
}
