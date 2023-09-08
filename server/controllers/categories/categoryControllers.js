const validationError = require('../../services/validationError');
const {
	addCategory,
	deleteCategory,
	editCategory,
	getCategorys,
} = require('./actionsCategory');

module.exports = {
	addCategoryController: async (req, res) => {
		try {
			const { statusCode, message } = await addCategory(req.body);
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, message, errors } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	delCategoryController: async (req, res) => {
		try {
			const { categoryId } = req.params;
			const { statusCode, message } = await deleteCategory(categoryId);
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	},
	editCategoryController: async (req, res) => {
		try {
			const { categoryId } = req.params;
			const { statusCode, message } = await editCategory(
				categoryId,
				req.body
			);
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, message, errors } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	getCategorysController: async (req, res) => {
		try {
			const language = req.get('Accept-Language');
			const { statusCode, message } = await getCategorys(language);
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, errors, message } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
};
