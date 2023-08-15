const {
    addUserController,
    getUsersController,
    addUserToGroupController,
    deleteUserController,
    editUserController,
} = require('../controllers/users/usersController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uplodImage = require('../middleware/uplodImage');
const router = require('express').Router();

//create user with admin
router.post('/add', authMiddleware, adminMiddleware, addUserController);
router.get('/', authMiddleware, adminMiddleware, getUsersController);
router.post(
    '/group',
    authMiddleware,
    adminMiddleware,
    addUserToGroupController
);
router.patch(
    '/:userId',
    authMiddleware,
    adminMiddleware,
    uplodImage.single('avatar'),
    editUserController
);
router.delete(
    '/:userId',
    authMiddleware,
    adminMiddleware,
    deleteUserController
);

module.exports = router;
