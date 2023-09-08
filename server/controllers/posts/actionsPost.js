const postsTable = require('../../models/index').posts;
const imagesTable = require('../../models/index').images;
const menuSubmenuPostTranslate =
	require('../../models/index').menus_has_submenus_post_languages;
const fs = require('fs');
const otherImagesTable = require('../../models/index').other_images;
const categoryPostTranslationTable =
	require('../../models/index').CategoryPostsTranslations;
const metaTable = require('../../models/index').metas;
const postMetaTable = require('../../models/index').post_has_meta;
const menuTable = require('../../models/index').menus;
const submenuTable = require('../../models/index').submenu;
const categoryTable = require('../../models/index').category;
const usersTable = require('../../models/index').users_table;
const languageTable = require('../../models/index').languages;
const validationError = require('../../services/validationError');
module.exports = {
	addPostBindMenu: async (postId, menuId, langId) => {
		try {
			const resultFindPost = await postsTable.findOne({
				where: { id: postId },
			});
			const resultFindMenu = await menuTable.findOne({
				where: { id: menuId },
			});
			const resultFindLanguage = await languageTable.findOne({
				where: { id: langId },
			});
			if (resultFindPost !== null) {
				if (resultFindMenu !== null) {
					if (resultFindLanguage !== null) {
						const result = await menuSubmenuPostTranslate.create({
							menuId: menuId,
							postId: postId,
							languageId: langId,
						});
						const res = await menuSubmenuPostTranslate.findOne({
							where: {
								id: result.id,
							},
							include: [menuTable, submenuTable],
							attributes: {
								exclude: [
									'languageId',
									'postId',
									'menuId',
									'submenuId',
									'createdAt',
									'updatedAt',
								],
							},
						});
						return {
							statusCode: 200,
							message: res,
						};
					}
					return {
						statusCode: 401,
						message: 'Language not specified',
					};
				}
				return {
					statusCode: 401,
					message: 'Menu not specified',
				};
			}
			return {
				statusCode: 401,
				message: 'Post whis this id not exists',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	addPostBindCategory: async (req, otherImagesPath, mainImagePath) => {
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

			if (resultFindCategory !== null) {
				if (resultFindLanguage !== null) {
					if (resultFindUserId !== null) {
						const resultFindCategory = await categoryTable.findOne({
							where: {
								id: categoryId,
							},
						});
						const resultFindUserId = await usersTable.findOne({
							where: { id: userId },
						});

						const resultFindLanguage = await languageTable.findOne({
							where: { id: languageId },
						});
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
						const result = await postsTable.findOne({
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
						return {
							statusCode: 200,
							message: result,
						};
					} else {
						return {
							statusCode: 401,
							message: 'User not specified',
						};
					}
				} else {
					return {
						statusCode: 401,
						message: 'Language not specified',
					};
				}
			}
			return {
				statusCode: 401,
				message: 'Category not specified',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	editPost: async (postId, req) => {
		try {
			await postsTable.update({ ...req.body }, { where: { id: postId } });
			return await postsTable.findOne({
				where: {
					id: postId,
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	deletePost: async (postId) => {
		try {
			const imagePost = await imagesTable.findOne({
				include: {
					model: postsTable,
					where: {
						id: postId,
					},
				},
			});
			const otherImages = await otherImagesTable.findAll({
				where: {
					postId: postId,
				},
				include: [imagesTable],
			});
			fs.unlinkSync(imagePost.path);
			for (const element of otherImages) {
				fs.unlinkSync(element.image.path);
			}
			await postsTable.destroy({
				where: { id: postId },
			});
			return {
				message: 'Post has removed',
			};
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
