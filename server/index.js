const express = require('express');
const db = require('./db');
const app = express();
const Users = db.users;
app.use(express.json());

app.get('/users', async (req, res) => {
	const result = await Users.findAll();
	res.status(200).send(result);
});
app.listen(3000, async () => {
	try {
		// await sequelize.authenticate();
		console.log(
			'Server is running... and connected DB'
		);
	} catch (error) {
		// console.log('server is running...');
		console.log(error);
	}
});
