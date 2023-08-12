const {
	addUserController,
	getUsersController,
	addUserToGroupController,
	deleteUserController,
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
router.get(
	'/',
	authMiddleware,
	adminMiddleware,
	getUsersController
);
router.post(
	'/group',
	authMiddleware,
	adminMiddleware,
	addUserToGroupController
);
router.delete(
	'/:userId',
	authMiddleware,
	adminMiddleware,
	deleteUserController
);
module.exports = router;
