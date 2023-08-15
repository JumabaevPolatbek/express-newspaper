const path = require('path');
const multer = require('multer');
const SharpMulter = require('sharp-multer');

// const newFilenameFunction = (og_filename, options) => {
//     const newname =
//         og_filename.split('.').slice(0, -1).join('.') +
//         `${options.useTimestamp ? '-' + Date.now() : ''}` +
//         '.' +
//         options.fileFormat;
//     return newname;
// };
const storage = multer.diskStorage({
	destination: 'uploads/images',
	filename: (req, file, cb) => {
		cb(
			null,
			Date.now() + path.extname(file.originalname)
		);
	},
});
// const storage = SharpMulter({
//     destination: (req, file, callback) => callback(null, 'uploads/images'),
//     imageOptions: {
//         fileFormat: 'jpg',
//         quality: 80,
//     },
//     filename: newFilenameFunction(),
// });
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};
const limits = {
    fileSize: 5000000,
};

module.exports = multer({ storage, fileFilter, limits });
