const generateToken = require('../../services/generateToken');
const {
	compareSync,
} = require('../../services/hashPassword');

const user = require('../../models/index').users_table;
module.exports = async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await user.findOne({
			where: {
				username: username,
			},
		});
		if (!result) {
			return res.status(400).json({
				message: username + ' user is not found',
			});
		}
		const validPassword = compareSync(
			password,
			result.password
		);
		if (!validPassword) {
			return res.status(400).json({
				message: 'Incorrect login or password',
			});
		}
		const token = generateToken(result.id);
		return res.status(200).json({ token: token });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error });
	}
};
