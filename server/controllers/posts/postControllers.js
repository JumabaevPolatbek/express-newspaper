const fs = require('fs');
const sharp = require('sharp');
const { addPostBindMenu } = require('./actionsPost');
module.exports = {
	addPostBindMenuController: async (req, res, next) => {
		try {
			const { mainImage, other_images } = req.files;
			const { title } = req.body;
			var arrPath = [];
			const mainImagePath =
				'uploads\\images\\image-' +
				mainImage[0].filename;
			await sharp(mainImage[0].path)
				.resize({ width: 800 })
				.toFormat('png')
				.png({ quality: 80 })
				.toFile(
					'uploads/images/image-' +
						mainImage[0].filename
				);
			fs.unlinkSync(mainImage[0].path);
			other_images.forEach(async (element) => {
				await sharp(element.path)
					.resize({ width: 800 })
					.toFormat('png')
					.png({ quality: 80 })
					.toFile(
						'uploads/images/image-' +
							element.filename
					);
				arrPath.push({
					name: title,
					path: `uploads\\images\\image-${element.filename}`,
				});
				fs.unlinkSync(element.path);
			});
			setTimeout(async () => {
				const result = await addPostBindMenu(
					req,
					arrPath,
					mainImagePath
				);
				return res.status(200).json(result);
			}, 11000);
		} catch (e) {
			console.log(e);
            fs.unlinkSync(req.files.mainImage[0].path)
            const {other_images}=req.files
            other_images.forEach(element=>fs.unlinkSync(element.path))
			return e;
		}
	},
};
