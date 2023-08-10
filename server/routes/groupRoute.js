const {
	addGroupController,
} = require('../controllers/groups/groupsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/add', authMiddleware, addGroupController);
module.exports = router;
