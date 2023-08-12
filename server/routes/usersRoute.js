const {
	addUserController,
} = require('../controllers/users/usersController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();

//create user with admin
router.post(
	'/add',
	authMiddleware,
	adminMiddleware,
	addUserController
);

module.exports = router;
