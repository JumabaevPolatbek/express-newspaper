const submenuTable = require('../../models/index').submenus;

module.exports = {
	addSubmenuBindMenu: async (body) => {
		try {
			const { submenu, parentMenuId, languageId } =
				body;
                const resultSubmenu=await submenuTable.create({})
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
