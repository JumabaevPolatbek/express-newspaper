const fs = require('fs');
const sharp = require('sharp');
const {
	addPostBindMenu,
	addPostBindCategory,
	editPost,
	deletePost,
} = require('./actionsPost');
const { getPosts, getPostsCategory } = require('./getPost');
module.exports = {
	addPostBindMenuController: async (req, res, next) => {
		try {
			const { postId, menuId, langId } = req.params;
			const result = await addPostBindMenu(
				postId,
				menuId,
				langId
			);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			fs.unlinkSync(req.files.mainImage[0].path);
			const { other_images } = req.files;
			other_images.forEach((element) =>
				fs.unlinkSync(element.path)
			);
			return e;
		}
	},
	addPostBindCategoryController: async (
		req,
		res,
		next
	) => {
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
			for (const element of other_images) {
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
			}
			const result = await addPostBindCategory(
				req,
				arrPath,
				mainImagePath
			);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			// fs.unlinkSync(req.files.mainImage[0].path);
			// const { other_images } = req.files;
			// other_images.forEach((element) =>
			// 	fs.unlinkSync(element.path)
			// );
			return e;
		}
	},
	editPostByIdController: async (req, res) => {
		try {
			const { postId } = req.params;
			const result = await editPost(postId, req);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	delPostByIdController: async (req, res) => {
		try {
			const { postId } = req.params;
			const result = await deletePost(postId);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	getPostsController: async (req, res) => {
		try {
			const result = await getPosts();
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	getPostsCategoryController: async (req, res) => {
		try {
			const result = await getPostsCategory();
			const language = req.get('Accept-Language');
			return res.status(200).json(language);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
};
