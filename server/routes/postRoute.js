const router = require('express').Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uploadimage = require('../middleware/uploadImage');
const {
    addPostBindMenuController, addPostBindCategoryController,
} = require('../controllers/posts/postControllers');
const arrUpload = uploadimage.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'other_images', maxCount: 10 },
]);
router.post(
    '/menu/:menuId',
    authMiddleware,
    adminMiddleware,
    arrUpload,
    addPostBindMenuController
);
router.post('/category=:categoryId',authMiddleware,adminMiddleware,arrUpload,addPostBindCategoryController)
module.exports = router;
