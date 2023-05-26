const jwt = require("jsonwebtoken")
const { User, Role } = require("../db/sequelize")
const { sendResStatus, sendResBody } = require("../utils/helpers")

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
			console.log(user)
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

exports.refresh = async (req , res) => {
	const {token} = req.headers

	console.log(token)

	const {id} = jwt.decode(token)

	console.log(id)

	User.findByPk(id, {include: Role})
	.then((user) => sendResBody(res , 200 , user))
	.catch(() => sendResStatus(res, 500))
}
