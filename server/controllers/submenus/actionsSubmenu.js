const submenuTable = require('../../models/index').submenu;
const menuSubmenuLangTable =
	require('../../models/index').menus_has_submenus_post_languages;
module.exports = {
	addSubmenuMenu: async (body) => {
		try {
			return await submenuTable.create({
				...body,
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	editSubmenuById: async (submenuId, body) => {
		try {
			const { submenu, parentMenuId, languageId } =
				body;
			await submenuTable.update(
				{ ...submenu },
				{ where: { id: submenuId } }
			);
			return await menuSubmenuLangTable.update(
				{
					menuId: parentMenuId,
					languageId: languageId,
				},
				{ where: { submenuId: submenuId } }
			);
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	submenuBindParentMenu: async ({
		submenuId,
		langId,
		parentMenuId,
	}) => {
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
