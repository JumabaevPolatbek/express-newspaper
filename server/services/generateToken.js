const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';

module.exports = (user) => {
	const payload = { ...user };
	return jwt.sign(payload, secretKey, {
		expiresIn: '24h',
	});
};
