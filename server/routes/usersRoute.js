const {
	addUserController,
	getUsersController,
	addUserToGroupController,
	deleteUserController,
	editUserController,
	imageUploadController,
	delImageController,
} = require('../controllers/users/usersController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uplodImage = require('../middleware/uploadImage');
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
router.patch(
	'/:userId',
	authMiddleware,
	editUserController
);
router.delete(
	'/:userId',
	authMiddleware,
	adminMiddleware,
	deleteUserController
);
router.put(
	'/:userId',
	authMiddleware,
	uplodImage.single('avatar'),
	imageUploadController
);
router.delete(
	'/image/:imageId',
	authMiddleware,
	delImageController
);

module.exports = router;
