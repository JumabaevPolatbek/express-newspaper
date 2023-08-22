const postsTable = require('../../models/index').posts;
const imagesTable = require('../../models/index').images;
const menuSubmenuPostTranslate =
	require('../../models/index').menus_has_submenus_post_languages;
const fs = require('fs');
const otherImagesTable =
	require('../../models/index').other_images;
const categoryPostTranslationTable =
	require('../../models/index').CategoryPostsTranslations;
const metaTable = require('../../models/index').metas;
const postMetaTable =
	require('../../models/index').post_has_meta;
module.exports = {
	addPostBindMenu: async (
		req,
		otherImagesPath,
		mainImagePath
	) => {
		try {
			var arrPath = [];
			const { title, content, languageId } = req.body;
			const { menuId } = req.params;
			const imageResult = await imagesTable.create({
				name: title,
				path: mainImagePath,
			});
			const postResult = await postsTable.create({
				title: title,
				content: content,
				imageId: imageResult.id,
				languageId: languageId,
			});

			const idImages = await imagesTable.bulkCreate(
				otherImagesPath
			);
			for (const element of idImages) {
				arrPath.push({
					postId: postResult.id,
					imageId: element.id,
				});
			}
			await otherImagesTable.bulkCreate(arrPath);
			await menuSubmenuPostTranslate.create({
				menuId: menuId,
				postId: postResult.id,
				languageId: languageId,
			});
			return await postsTable.findOne({
				where: {
					id: postResult.id,
				},
				include: {
					model: imagesTable,
				},
				attributes: {
					exclude: ['imageId'],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	addPostBindCategory: async (
		req,
		otherImagesPath,
		mainImagePath
	) => {
		try {
			var arrPath = [];
			const {
				title,
				content,
				languageId,
				meta_name,
				meta_content,
				userId,
			} = req.body;
			const { categoryId } = req.params;
			const imageResult = await imagesTable.create({
				name: title,
				path: mainImagePath,
			});
			const postResult = await postsTable.create({
				title: title,
				content: content,
				imageId: imageResult.id,
				languageId: languageId,
			});
			const metaResult = await metaTable.create({
				name: meta_name,
				content: meta_content,
			});
			const idImages = await imagesTable.bulkCreate(
				otherImagesPath
			);
			for (const element of idImages) {
				arrPath.push({
					postId: postResult.id,
					imageId: element.id,
				});
			}
			await otherImagesTable.bulkCreate(arrPath);

			await categoryPostTranslationTable.create(
				{
					categoryId: categoryId,
					postId: postResult.id,
					metaId: metaResult.id,
					userId: userId,
					languageId: languageId,
				},
				{
					include: [metaTable],
				}
			);
			await postMetaTable.create({
				postId: postResult.id,
				metaId: metaResult.id,
			});
			return await postsTable.findOne({
				where: {
					id: postResult.id,
				},
				include: [
					{
						model: imagesTable,
					},
					{
						model: metaTable,
						through: {
							attributes: [],
						},
					},
					{
						model: imagesTable,
						as: 'postOtherImage',
						through: {
							attributes: [],
						},
					},
				],
				attributes: {
					exclude: ['imageId'],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
