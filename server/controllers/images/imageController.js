const fs = require('fs');
const sharp = require('sharp');
const validationError = require('../../services/validationError');
const {
	getImages,
	createImages,
	removeByIdImage,
	removeManyImage,
} = require('./actionsImage');
module.exports = {
	getImagesController: async (req, res) => {
		try {
			const { message, statusCode } = await getImages();
			return res.statusCode(statusCode).json({ message: message });
		} catch (error) {
			const { errors, statusCode, message } = validationError(error);
			return res
				.statusCode(statusCode)
				.json({ message: message, error: errors });
		}
	},
	addImageController: async (req, res) => {
		try {
			var arrPath = [];
			for (const element of req.files) {
				await sharp(element.path)
					.resize({ width: 800 })
					.toFormat('png')
					.png({ quality: 80 })
					.toFile('uploads/images/image-' + element.filename);
				arrPath.push({
					name: title,
					path: `uploads\\images\\image-${element.filename}`,
				});
				fs.unlinkSync(element.path);
			}
			const { statusCode, message } = await createImages(arrPath);
			return res.statusCode(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			req.files.forEach((element) => fs.unlinkSync(element.path));
			const { statusCode, errors, message } = validationError(error);
			return res
				.statusCode(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	removeImageByIdController: async (req, res) => {
		try {
			const { statusCode, message } = await removeByIdImage(req.params);
			return res.statusCode(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.statusCode(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	removeManyImageController: async (req, res) => {
		try {
			const { ids } = req.body;
			const { statusCode, message } = await removeManyImage(ids);
			return res.statusCode(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.statusCode(statusCode)
				.json({ message: message, errors: errors });
		}
	},
};
