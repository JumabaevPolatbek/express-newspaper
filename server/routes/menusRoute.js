const {
	addMenuController,
	editMenuController,
	delMenuController,
	getMenusController,
	getMenuByIdController,
} = require('../controllers/menus/menusControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/lang=:languageId', getMenusController);

router.get(
	'/menuId=:menuId&langId=:languageId',
	getMenuByIdController
);

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
