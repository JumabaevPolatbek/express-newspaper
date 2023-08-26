const db = require('../../models/index');

const categoryTable = db.category;
const languageTable = db.languages;
module.exports = {
	addCategory: async (body) => {
		try {
			return await categoryTable.create({ ...body });
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	deleteCategory: async (categoryId) => {
		try {
			await categoryTable.destroy({
				where: {
					id: categoryId,
				},
			});
			return { message: 'Success' };
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	editCategory: async (categoryId, body) => {
		try {
			return await categoryTable.update(
				{ ...body },
				{ where: { id: categoryId } }
			);
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	getCategorys: async (language) => {
		try {
			const resultLang = await languageTable.findOne({
				where: {
					iso_639_code: language,
				},
			});
			return await categoryTable.findAll({
				where: {
					languageId: resultLang.id,
				},
				attributes: {
					exclude: ['languageId'],
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
