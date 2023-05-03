const jwt = require("jsonwebtoken")
const { User } = require("../db/sequelize")
const { sendResStatus } = require("../utils/helpers")

exports.signin = (req, res) => {
	const { email, password } = req.body
	User.findOne({
		where: {
			email
		}
	})
		.then(async user => {
			const decoded = await bcrypt.compare(password, user.password)
			if (!user || !decoded) {
				return sendResStatus(res, 409, "Invalid Email or Password")
			}
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: 80000
			})

			return res.send({ token })
		})
		.catch(_ => sendResStatus(res, 500))
}
