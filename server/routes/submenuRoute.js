const {
    addSubmenuController,
    editSubmenuController, submenuBindMenuController, delSubmenuController,
} = require('../controllers/submenus/subMenuControllers');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = require('express').Router();

router.post('/add', authMiddleware, adminMiddleware, addSubmenuController);

router.put(
    '/:submenuId',
    authMiddleware,
    adminMiddleware,
    editSubmenuController
);
router.post('/:submenuId&langId=:langId&parentMenuId=:parentMenuId',authMiddleware,adminMiddleware,submenuBindMenuController)
router.delete('/:submenuId',authMiddleware,adminMiddleware,delSubmenuController)
module.exports = router;
