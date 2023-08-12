const {
	addGroupController,
	getGroupsController,
	removeGroupController,
	editGroupController,
} = require('../controllers/groups/groupsController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post(
	'/add',
	authMiddleware,
	adminMiddleware,
	addGroupController
);
router.get(
	'/all',
	authMiddleware,
	adminMiddleware,
	getGroupsController
);
router.delete(
	'/:groupId',
	authMiddleware,
	adminMiddleware,
	removeGroupController
);
router.patch(
	'/:groupId',
	authMiddleware,
	adminMiddleware,
	editGroupController
);
module.exports = router;
