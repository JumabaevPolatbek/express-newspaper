const {
	getImagesController,
	addImageController,
	removeImageByIdController,
	removeManyImageController,
} = require('../controllers/images/imageController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uploadimage = require('../middleware/uploadImage');
const router = require('express').Router();

router.get('/', getImagesController);
router.post(
	'/create',
	authMiddleware,
	uploadimage.array('images', 10),
	addImageController
);
router.delete(
	'/:id',
	authMiddleware,
	adminMiddleware,
	removeImageByIdController
);
router.delete('/', authMiddleware, adminMiddleware, removeManyImageController);

module.exports = router;
