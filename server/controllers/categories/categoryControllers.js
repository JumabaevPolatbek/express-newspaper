const {
	addCategory,
	deleteCategory,
	editCategory,
	getCategorys,
} = require('./actionsCategory');

module.exports = {
	addCategoryController: async (req, res) => {
		try {
			const result = await addCategory(req.body);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(200).json(e);
		}
	},
	delCategoryController: async (req, res) => {
		try {
			const { categoryId } = req.params;
			const result = await deleteCategory(categoryId);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	editCategoryController: async (req, res) => {
		try {
			const { categoryId } = req.params;
			const result = await editCategory(
				categoryId,
				req.body
			);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	getCategorysController: async (req, res) => {
		try {
			const language = req.get('Accept-Language');
			const result = await getCategorys(language);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
};
