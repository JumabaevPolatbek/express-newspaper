const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';

module.exports = (userId) => {
	const payload = {
		userId: userId,
	};
	return jwt.sign(payload, secretKey, {
		expiresIn: '24h',
	});
};
