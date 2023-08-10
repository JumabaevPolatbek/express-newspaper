const bcrypt = require('bcrypt');
const salt = 7;
module.exports = {
	hashPassword: (password) =>
		bcrypt.hashSync(password, salt),
	compareSync: (password, dbPassword) =>
		bcrypt.compareSync(password, dbPassword),
};
