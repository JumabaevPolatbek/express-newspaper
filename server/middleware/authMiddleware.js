const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';
const usersTable = require('../models/index').users_table;
const permissionsTable =
	require('../models/index').permissions;
module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token =
			req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(400).json({
				message: 'User is not authorized',
			});
		}
		const { userId } = jwt.verify(token, secretKey);
		const result = await usersTable.findOne({
			where: {
				id: userId,
			},
			include: {
				model: permissionsTable,
				as: 'permissions',
				through: {
					attributes: [],
				},
			},
		});
		const { permissions } = result;
		if (permissions[0].access_cms === false) {
			res.status(400).json({
				message: `You don't have access`,
			});
		}
		req.user = result;
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: 'User is not authorized' });
	}
};
