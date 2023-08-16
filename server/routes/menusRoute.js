const {
	addMenuController,
	editMenuController,
	delMenuController,
} = require('../controllers/menus/menusControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post(
	'/add',
	authMiddleware,
	adminMiddleware,
	addMenuController
);

router.patch(
	'/:menuId',
	authMiddleware,
	adminMiddleware,
	editMenuController
);

router.delete(
	'/:menuId',
	authMiddleware,
	adminMiddleware,
	delMenuController
);
module.exports = router;
