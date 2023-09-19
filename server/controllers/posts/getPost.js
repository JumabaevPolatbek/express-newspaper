const db = require('../../models/index');
const postTable = db.posts;
const categoryTable = db.category;
const languageTable = db.languages;
const metaTable = db.metas;
const imageTable = db.images;
const userTable = db.users_table;
const categoryPostsUsersTable = db.CategoryPostsTranslations;
const menuHasSubmenuPostTranslateTable = db.menus_has_submenus_post_languages;
const menuTable = db.menus;
const { Op } = require('sequelize');
const validationError = require('../../services/validationError');
module.exports = {
	getPosts: async () => {
		try {
			// const langId = await languageTable.findOne({
			//     where: {
			//         iso_639_code: language,
			//     },
			// });
			const result = await postTable.findAll({
				// limit: 4,
				// offset: 3,

				include: [
					{
						model: metaTable,
						through: {
							attributes: [],
						},
					},
					{ model: imageTable },
					{
						model: imageTable,
						as: 'postOtherImage',
						through: {
							attributes: [],
						},
					},
					{
						model: languageTable,
						attributes: {
							exclude: [
								'id',
								'country',
								'createdAt',
								'updatedAt',
							],
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
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
	getPostsCategory: async (language) => {
		try {
			const langId = await languageTable.findOne({
				where: {
					iso_639_code: language,
				},
			});
			return await categoryTable.findAll({
				// limit: 2,
				// offset: 3,
				where: {
					languageId: langId.id,
				},
				include: [
					{
						model: categoryPostsUsersTable,
						as: 'posts',
						where: {
							languageId: langId.id,
						},
						include: [
							{
								model: postTable,
								include: [
									{ model: imageTable },
									{
										model: imageTable,
										as: 'postOtherImage',
										through: {
											attributes: [],
										},
									},
								],
								attributes: {
									exclude: ['imageId', 'languageId'],
								},
							},
						],
						attributes: {
							exclude: [
								'postId',
								'userId',
								'description',
								'categoryId',
								'createdAt',
								'updatedAt',
								'languageId',
								'metaId',
							],
						},
					},
				],
				attributes: {
					exclude: ['languageId', 'createdAt', 'updatedAt'],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	getPostsByMenu: async (language) => {
		try {
			const langId = await languageTable.findOne({
				where: {
					iso_639_code: language,
				},
			});
			return await menuTable.findAll({
				where: {
					languageId: langId.id,
				},
				include: [
					{
						model: menuHasSubmenuPostTranslateTable,
						as: 'posts',
						include: [
							{
								model: postTable,
								include: [
									{
										model: imageTable,
									},
									{
										model: imageTable,
										as: 'postOtherImage',
										through: {
											attributes: [],
										},
									},
								],
								attributes: {
									exclude: ['languageId'],
								},
							},
						],
						attributes: {
							exclude: [
								// 'id',
								'description',
								'languageId',
								'menuId',
								'submenuId',
								'createdAt',
								'updatedAt',
								'postId',
							],
						},
						where: {
							postId: {
								[Op.ne]: null,
							},
						},
					},
				],
				attributes: {
					exclude: ['languageId'],
				},
				// offset: 8,
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	getPostById: async (postId) => {
		try {
			return await postTable.findOne({
				where: {
					id: postId,
				},
				include: [
					{
						model: imageTable,
					},
					{
						model: imageTable,
						as: 'postOtherImage',
						through: {
							attributes: [],
						},
					},
					{
						model: metaTable,
						through: {
							attributes: [],
						},
					},
					{
						model: categoryPostsUsersTable,
						as: 'authors',
						attributes: ['id'],
						include: { model: userTable, as: 'author' },
					},
				],
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
