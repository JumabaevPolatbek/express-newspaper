const {
	addCategoryController,
	editCategoryController,
	delCategoryController,
} = require('../controllers/categories/categoryControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post(
	'/add',
	authMiddleware,
	adminMiddleware,
	addCategoryController
);

router.put(
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
module.exports = router;
