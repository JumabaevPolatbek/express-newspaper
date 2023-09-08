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
				return {
					statusCode: 200,
					message: `Submenu id ${submenuId} changed successfully`,
				};
			}
			return {
				statusCode: 401,
				message: 'Submenu with this id not exists',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	submenuBindParentMenu: async ({ submenuId, langId, parentMenuId }) => {
		try {
			const resultFind = await submenuTable.findOne({
				where: {
					id: submenuId,
				},
			});
			if (resultFind !== null) {
				await menuSubmenuLangTable.create({
					menuId: parentMenuId,
					submenuId: submenuId,
					languageId: langId,
				});
				return {
					statusCode: 200,
					message: `Submenu whis this id change succesfully`,
				};
			}
			return {
				statusCode: 401,
				message: 'Submenu whis this id not exists',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	delSubmenu: async (submenuId) => {
		try {
			const resultFind = await submenuTable.findOne({
				where: {
					id: submenuId,
				},
			});
			if (resultFind !== null) {
				await submenuTable.destroy({
					where: {
						id: submenuId,
					},
				});
				return {
					statusCode: 200,
					message: 'Submenu whis this id removed succesfully',
				};
			}
			return {
				statusCode: 401,
				message: 'Submenu whis this id not exists',
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
};
