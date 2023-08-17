const {
    addSubmenuController,
} = require('../controllers/submenus/subMenuControllers');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = require('express').Router();

router.post('/add', authMiddleware, adminMiddleware, addSubmenuController);

module.exports = router;
