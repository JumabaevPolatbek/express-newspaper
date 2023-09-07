const generateToken = require('../../services/generateToken');
const {
	compareSync,
} = require('../../services/hashPassword');
const validationError = require('../../services/validationError');

const user = require('../../models/index').users_table;
module.exports = async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await user.findOne({
			where: {
				username: username.toLowerCase(),
			},
		});
		if (!result) {
			return res.status(204).json({
				message: username + ' user is not found',
			});
		}
		const validPassword = compareSync(
			password,
			result.password
		);
		if (!validPassword) {
			return res.status(401).json({
				message: 'Incorrect login or password',
			});
		}
		const token = generateToken(result.id);
		return res.status(200).json({ token: token });
	} catch (error) {
		const {message,statusCode}= validationError(error)
		return res.status(statusCode).json(message)
	}
};
