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

router.get('/', getMenusController);

router.get('/:menuId', getMenuByIdController);

router.post('/create', authMiddleware, adminMiddleware, addMenuController);

router.patch('/:menuId', authMiddleware, adminMiddleware, editMenuController);

router.delete('/:menuId', authMiddleware, adminMiddleware, delMenuController);
module.exports = router;
