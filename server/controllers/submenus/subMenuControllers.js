const validationError = require('../../services/validationError');
const {
	addSubmenuMenu,
	editSubmenuById,
	submenuBindParentMenu,
	delSubmenu,
} = require('./actionsSubmenu');

module.exports = {
	addSubmenuController: async (req, res) => {
		try {
			const { statusCode, message } = await addSubmenuMenu(req.body);
			return res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	editSubmenuController: async (req, res) => {
		try {
			const { submenuId } = req.params;
			const { statusCode, message } = await editSubmenuById(
				submenuId,
				req.body
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
	submenuBindMenuController: async (req, res) => {
		try {
			const { statusCode, message } = await submenuBindParentMenu({
				...req.params,
			});
			return res.status(statusCode).json({ message: message });
		} catch (e) {
			console.log(e);
			const { statusCode, message, errors } = validationError(e);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	delSubmenuController: async (req, res) => {
		try {
			const { submenuId } = req.params;
			const { statusCode, message } = await delSubmenu(submenuId);
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
