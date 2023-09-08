const submenuTable = require('../../models/index').submenu;
const menuSubmenuLangTable =
	require('../../models/index').menus_has_submenus_post_languages;
const validationError = require('../../services/validationError');
module.exports = {
	addSubmenuMenu: async (body) => {
		try {
			const result = await submenuTable.create({
				...body,
			});
			return {
				statusCode: 200,
				message: result,
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	editSubmenuById: async (submenuId, body) => {
		try {
			const resultFind = await submenuTable.findOne({
				where: { id: submenuId },
			});
			if (resultFind !== null) {
				await submenuTable.update(
					{ ...body },
					{ where: { id: submenuId } }
				);
				return;
			}

			return;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	submenuBindParentMenu: async ({ submenuId, langId, parentMenuId }) => {
		try {
			return await menuSubmenuLangTable.create({
				menuId: parentMenuId,
				submenuId: submenuId,
				languageId: langId,
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	delSubmenu: async (submenuId) => {
		try {
			return await submenuTable.destroy({
				where: {
					id: submenuId,
				},
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
