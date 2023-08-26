const db = require('../../models/index');
const postTable = db.posts;
const categoryTable = db.category;
const languageTable = db.languages;
const metaTable = db.metas;
const imageTable = db.images;
const userTable = db.users_table;
const categoryPostsUsersTable =
	db.CategoryPostsTranslations;
const menuHasSubmenuPostTranslateTable =
	db.menus_has_submenus_post_languages;
const menuTable = db.menus;
const { Op } = require('sequelize');
module.exports = {
	getPosts: async (language) => {
		try {
			const langId = await languageTable.findOne({
				where: {
					iso_639_code: language,
				},
			});
			return await postTable.findAll({
				// limit: 4,
				// offset: 3,
				where: {
					languageId: langId.id,
				},
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
					exclude: ['imageId', 'languageId'],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
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
				limit: 2,
				// offset: 3,
				where: {
					languageId: langId.id,
				},
				include: [
					{
						model: categoryPostsUsersTable,
						as: 'posts',
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
									exclude: ['imageId'],
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
				offset: 8,
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
