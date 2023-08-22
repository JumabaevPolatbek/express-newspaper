const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const groupRouter = require('./routes/groupRoute');
const userRouter = require('./routes/usersRoute');
const languageRouter = require('./routes/languageRoute');
const menusRouter = require('./routes/menusRoute');
const submenuRouter = require('./routes/submenuRoute');
const postRouter = require('./routes/postRoute');
const categoryRouter = require('./routes/categoryRoute');
app.use(express.json());
app.use('/auth', authRouter);
app.use('/group', groupRouter);
app.use('/users', userRouter);
app.use('/language', languageRouter);
app.use('/menus', menusRouter);
app.use('/submenu', submenuRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);
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
