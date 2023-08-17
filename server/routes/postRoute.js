const router = require('express').Router();
const authmiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const uploadimage = require('../middleware/uplodimage');
const fs = require('fs');
const arrUpload = uploadimage.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'other_images', maxCount: 10 },
]);
router.post(
    '/add',
    authmiddleware,
    adminmiddleware,
    // uploadimage.single('mainimage'),
    arrUpload,
    async (req, res) => {
        try {
            // fs.unlinkSync(req.files.path);
            console.log(req.files);
            return res.status(200).json(req.files.path);
        } catch (e) {
            console.log(e);
            return e;
        }
    }
);
module.exports = router;
