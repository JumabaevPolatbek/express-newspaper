const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
app.use(express.json());
app.use('/auth', authRouter);
const start = async () => {
	try {
		app.listen(3000, () =>
			console.log('Server is running')
		);
	} catch (error) {
		console.log(error);
	}
};

start();
