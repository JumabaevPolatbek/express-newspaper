const db = require('../../models/index');

const categoryTable = db.category;

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
			return await categoryTable.destroy({
				where: {
					id: categoryId,
				},
			});
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
};
