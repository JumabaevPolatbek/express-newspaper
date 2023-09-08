const menusTable = require('../../models/index').menus;
const submenuTable = require('../../models/index').submenu;
const menuHasLanguages =
	require('../../models/index').menus_has_submenus_post_languages;
const languageTable = require('../../models/index').languages;
const validationError = require('../../services/validationError');
module.exports = {
	addMenuHasLanguage: async (body) => {
		try {
			const result = await menusTable.create({
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
	editMenu: async (body, menuId) => {
		try {
			const resultFind = await menusTable.findOne({
				where: { id: menuId },
			});
			if (resultFind !== null) {
				await menusTable.update(
					{
						...body,
					},
					{ where: { id: menuId } }
				);
				return {
					statusCode: 200,
					message: `Menu id ${menuId} changed successfully`,
				};
			}
			return {
				statusCode: 401,
				message: 'Menu with this id not exists',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	delMenu: async (menuId) => {
		try {
			const resultFind = await menusTable.findOne({
				where: { id: menuId },
			});
			if (resultFind !== null) {
				await await menusTable.destroy({
					where: {
						id: menuId,
					},
				});
				return {
					statusCode: 200,
					message: `Menu id ${menuId} removed successfully`,
				};
			}
			return {
				statusCode: 401,
				message: 'Menu with this id not exits',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	getMenus: async (languageId) => {
		try {
			const result = await menusTable.findAll({
				where: {
					languageId: languageId,
				},
				include: [
					{
						model: menuHasLanguages,
						as: 'childMenus',
						attributes: {
							exclude: [
								'postId',
								'languageId',
								'description',
								'menuId',
								'createdAt',
								'updatedAt',
								'id',
							],
						},
						include: {
							model: submenuTable,
							attributes: {
								exclude: [
									'languageId',
									'createdAt',
									'updatedAt',
								],
							},
						},
					},
				],
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'languageId'],
				},
			});
			return {
				statusCode: 200,
				message: result,
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
	getMenuById: async (menuId, languageId) => {
		try {
			const resultFind = await menusTable.findOne({
				where: {
					id: menuId,
					languageId: languageId,
				},
				include: [
					{
						model: menuHasLanguages,
						as: 'childMenus',
						attributes: {
							exclude: [
								'postId',
								'languageId',
								'description',
								'menuId',
								'createdAt',
								'updatedAt',
								'id',
							],
						},
						include: {
							model: submenuTable,
							attributes: {
								exclude: [
									'languageId',
									'createdAt',
									'updatedAt',
								],
							},
						},
					},
				],
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			});
			if (resultFind !== null) {
				return {
					statusCode: 200,
					message: resultFind,
				};
			}
			return {
				statusCode: 401,
				message: 'Menu with this id not exists',
			};
		} catch (e) {
			console.log(e);
			return validationError(e);
		}
	},
};
