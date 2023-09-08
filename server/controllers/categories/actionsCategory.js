const db = require('../../models/index');
const validationError = require('../../services/validationError');

const categoryTable = db.category;
const languageTable = db.languages;
module.exports = {
	addCategory: async (body) => {
		try {
			const result = await categoryTable.create({ ...body });
			return {
				statusCode: 200,
				message: result,
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
	deleteCategory: async (categoryId) => {
		try {
			const resultFind = await categoryTable.findOne({
				where: {
					id: categoryId,
				},
			});
			if (resultFind !== null) {
				await categoryTable.destroy({
					where: {
						id: categoryId,
					},
				});
				return {
					statusCode: 200,
					message: 'Category whis this id removed successfuly',
				};
			}

			return {
				message: 'Category whis this id not exists',
				statusCode: 401,
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
	editCategory: async (categoryId, body) => {
		try {
			const resultFind = await categoryTable.findOne({
				where: {
					id: categoryId,
				},
			});
			if (resultFind !== null) {
				await categoryTable.update(
					{ ...body },
					{ where: { id: categoryId } }
				);
				return {
					statusCode: 200,
					message: 'Category whis this id updated successfuly',
				};
			}
			return {
				message: 'Category whis this id not exists',
				statusCode: 401,
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
	getCategorys: async (language) => {
		try {
			const resultLang = await languageTable.findOne({
				where: {
					iso_639_code: language,
				},
			});
			if (resultLang !== null) {
				const result = await categoryTable.findAll({
					where: {
						languageId: resultLang.id,
					},
					attributes: {
						exclude: ['languageId'],
					},
				});
				return {
					statusCode: 200,
					message: result,
				};
			}
			return {
				statusCode: 401,
				message: 'There is no category in this language',
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
};
