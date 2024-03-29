const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const {
	addLanguageController,
	editLanguageController,
	delLanguageController,
	getLanguagesController,
	getLanguageController,
} = require('../controllers/language/languageControllers');
const router = require('express').Router();

router.post('/create', authMiddleware, adminMiddleware, addLanguageController);
router.patch(
	'/:languageId',
	authMiddleware,
	adminMiddleware,
	editLanguageController
);
router.delete(
	'/:languageId',
	authMiddleware,
	adminMiddleware,
	delLanguageController
);
router.get('/', getLanguagesController);
router.get('/:languageId', getLanguageController);
module.exports = router;
