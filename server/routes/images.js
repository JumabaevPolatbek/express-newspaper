const { getImagesPath } = require('../controllers/images/imageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/', async (req, res) => {
	try {
		return await getImagesPath(res);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error });
	}
});

module.exports = router;
