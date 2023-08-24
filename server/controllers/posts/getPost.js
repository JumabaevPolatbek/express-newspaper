const db = require('../../models/index');
const postTable = db.posts;
const categoryTable = db.category;
const languageTable = db.languages;
const metaTable = db.meta;
const imageTable = db.images;
const userTable = db.users_table;
const categoryPostsUsersTable =
	db.CategoryPostsTranslations;
module.exports = {
	getPosts: async () => {
		try {
			return await postTable.findAll({
				include: [
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
	getPostsCategory: async () => {
		try {
			return await categoryPostsUsersTable.findAll({
				include: [
					{
						model: categoryTable,
						attributes: {
							exclude: [
								'languageId',
								'createdAt',
								'updatedAt',
							],
						},
					},
					{
						model: postTable,
						include: [
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
							{ model: imageTable },
							{
								model: imageTable,
								as: 'postOtherImage',
							},
						],
						attributes: {
							exclude: [
								'languageId',
								'imageId',
							],
						},
					},
				],
				attributes: {
					exclude: [
						'categoryId',
						'postId',
						'languageId',
						'createdAt',
						'updatedAt',
						'metaId',
						'userId',
					],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
