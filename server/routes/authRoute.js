const router = require('express').Router();
const loginController = require('../controllers/auth/login');
// const getUsers = require('../controllers/users/getUsers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signin', loginController);
// router.get('/users', authMiddleware, getUsers);
module.exports = router;
