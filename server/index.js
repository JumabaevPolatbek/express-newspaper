const express = require('express');
const https = require('https');
const app = express();
const authRouter = require('./routes/authRoute');
const groupRouter = require('./routes/groupRoute');
const userRouter = require('./routes/usersRoute');
const languageRouter = require('./routes/languageRoute');
const menusRouter = require('./routes/menusRoute');
const submenuRouter = require('./routes/submenuRoute');
const postRouter = require('./routes/postRoute');
const categoryRouter = require('./routes/categoryRoute');
const imageRouter = require('./routes/imagesRoute');
const cors = require('cors');
const corsOptions = {
	origin: '*',
	methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
	exposedHeaders: ['Content-Length', 'X-Foo'],
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/group', groupRouter);
app.use('/users', userRouter);
app.use('/language', languageRouter);
app.use('/menus', menusRouter);
app.use('/submenu', submenuRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('images', imageRouter);
const start = async () => {
	try {
		app.listen(5000, () => console.log('Server is running 5000'));
	} catch (error) {
		console.log(error);
	}
};

start();
