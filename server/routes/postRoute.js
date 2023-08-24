const router = require('express').Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uploadimage = require('../middleware/uploadImage');
const {
	addPostBindMenuController,
	addPostBindCategoryController,
	editPostByIdController,
	delPostByIdController,
	getPostsController,
	getPostsCategoryController,
} = require('../controllers/posts/postControllers');
const arrUpload = uploadimage.fields([
	{ name: 'mainImage', maxCount: 1 },
	{ name: 'other_images', maxCount: 10 },
]);
const postTable = require('../models/index').posts;
const metaTable = require('../models/index').metas;
const categoryTable =
	require('../models/index').CategoryPostsTranslations;
router.post(
	'/post=:postId&menu=:menuId&lang=:languageId',
	authMiddleware,
	addPostBindMenuController
);
router.post(
	'/category=:categoryId',
	authMiddleware,
	adminMiddleware,
	arrUpload,
	addPostBindCategoryController
);

router.get('/metas', async (req, res) => {
	try {
		const result = await postTable.findAll({
			include: {
				model: categoryTable,
				as: 'postForCategories',
				include: {
					model: metaTable,
				},
			},
		});
		return res.status(200).json(result);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});
router.put(
	'/:postId',
	authMiddleware,
	editPostByIdController
);
router.delete(
	'/:postId',
	authMiddleware,
	delPostByIdController
);
router.get('/all', getPostsController);
router.get('/category', getPostsCategoryController);
module.exports = router;
