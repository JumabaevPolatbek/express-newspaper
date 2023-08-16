const {
	addMenuHasLanguage,
	editMenu,
	delMenu,
} = require('./actionsMenu');

module.exports = {
	addMenuController: async (req, res) => {
		try {
			const result = await addMenuHasLanguage(
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	},
	editMenuController: async (req, res) => {
		try {
			const { menuId } = req.params;
			const result = await editMenu(req.body, menuId);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	},
	delMenuController: async (req, res) => {
		try {
			const { menuId } = req.params;
			await delMenu(menuId);
			return res
				.status(200)
				.json({ message: 'Success' });
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	},
};