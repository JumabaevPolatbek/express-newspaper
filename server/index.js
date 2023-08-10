const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const groupRouter = require('./routes/groupRoute');
app.use(express.json());
app.use('/auth', authRouter);
app.use('/group', groupRouter);
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
