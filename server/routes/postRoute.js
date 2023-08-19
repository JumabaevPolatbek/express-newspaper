const router = require('express').Router();
const authmiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const uploadimage = require('../middleware/uplodimage');
const {
	addPostBindMenuController,
} = require('../controllers/posts/postControllers');
const arrUpload = uploadimage.fields([
	{ name: 'mainImage', maxCount: 1 },
	{ name: 'other_images', maxCount: 10 },
]);
router.post(
	'/menu/:menuId',
	authmiddleware,
	adminmiddleware,
	arrUpload,
	addPostBindMenuController
);
module.exports = router;
