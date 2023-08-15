const {
    addMenuController,
    editMenuController,
} = require('../controllers/menus/menusControllers');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/add', authMiddleware, adminMiddleware, addMenuController);

router.patch('/:menuId', authMiddleware, adminMiddleware, editMenuController);
module.exports = router;
