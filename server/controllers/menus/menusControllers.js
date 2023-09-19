const validationError = require('../../services/validationError');
const {
	addMenuHasLanguage,
	editMenu,
	delMenu,
	getMenus,
	getMenuById,
} = require('./actionsMenu');

module.exports = {
	addMenuController: async (req, res) => {
		try {
			const { statusCode, message } = await addMenuHasLanguage(
				req.body.data
			);
			return res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	editMenuController: async (req, res) => {
		try {
			const { menuId } = req.params;
			const { statusCode, message } = await editMenu(req.body, menuId);
			return res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	delMenuController: async (req, res) => {
		try {
			const { menuId } = req.params;
			const { statusCode, message } = await delMenu(menuId);
			return res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	getMenusController: async (req, res) => {
		try {
			// const { languageId } = req.params;
			const { statusCode, message } = await getMenus();
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, message, errors } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	getMenuByIdController: async (req, res) => {
		try {
			const { menuId } = req.params;
			const { statusCode, message } = await getMenuById(menuId);
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, message, errors } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
};
