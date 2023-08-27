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
    getPostsByMenuController,
    getPostByIdController,
} = require('../controllers/posts/postControllers');
const arrUpload = uploadimage.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'other_images', maxCount: 10 },
]);
const postTable = require('../models/index').posts;
const metaTable = require('../models/index').metas;
const categoryTable = require('../models/index').CategoryPostsTranslations;
router.post(
    '/post=:postId&menu=:menuId&langId=:langId',
    authMiddleware,
    addPostBindMenuController
);
router.post(
    '/category=:categoryId',
    authMiddleware,
    arrUpload,
    addPostBindCategoryController
);
router.put('/:postId', authMiddleware, editPostByIdController);
router.delete('/:postId', authMiddleware, delPostByIdController);
router.get('/all', getPostsController);
router.get('/category', getPostsCategoryController);
router.get('/menu', getPostsByMenuController);
router.get('/:postId', getPostByIdController);
module.exports = router;
