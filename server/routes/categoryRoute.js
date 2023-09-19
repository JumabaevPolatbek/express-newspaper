const {
	addCategoryController,
	editCategoryController,
	delCategoryController,
	getCategorysController,
	getCategoryByIdController,
} = require('../controllers/categories/categoryControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/create', authMiddleware, adminMiddleware, addCategoryController);

router.patch(
	'/:categoryId',
	authMiddleware,
	adminMiddleware,
	editCategoryController
);

router.delete(
	'/:categoryId',
	authMiddleware,
	adminMiddleware,
	delCategoryController
);
router.get('/', getCategorysController);
router.get('/:categoryId', getCategoryByIdController);
module.exports = router;
