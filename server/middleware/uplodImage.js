const path = require('path');
const multer = require('multer');
const moment = require('moment');
const storage = multer.diskStorage({
	destination: 'uploads/images',
	filename: (req, file, cb) => {
		cb(
			null,
			moment().format('YYYY-MM-DD-HH-mm-ss') +
				path.extname(file.originalname)
		);
	},
});
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(
			new Error(
				'Only .png, .jpg and .jpeg format allowed!'
			)
		);
	}
};
const limits = {
	fileSize: 5000000,
};

module.exports = multer({ storage, fileFilter, limits });
