const menusTable = require('../../models/index').menus;
const submenuTable = require('../../models/index').submenus;
const menuHasLanguages =
	require('../../models/index').menus_has_submenus_post_languages;
const languageTable =
	require('../../models/index').languages;
module.exports = {
	addMenuHasLanguage: async (body) => {
		try {
			const { menus, languageId, description } = body;
			const [menu, created] =
				await menusTable.findOrCreate({
					where: {
						...menus,
					},
				});
			if (created === true) {
				const result =
					await menuHasLanguages.create({
						description: description,
						menuId: menu.id,
						languageId: languageId,
					});
				return await menuHasLanguages.findOne({
					where: {
						id: result.id,
					},
					include: [
						{
							model: menusTable,
						},
						{
							model: languageTable,
						},
					],
					attributes: {
						exclude: [
							'menuId',
							'submenuId',
							'postId',
							'languageId',
						],
					},
				});
			}
			return new Error('Server database error');
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	postBindToMenuTranslate: async (body) => {
		try {
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	editMenu: async (body, menuId) => {
		try {
			const { menus, languageId, description } = body;

			await menusTable.update(
				{
					...menus,
				},
				{ where: { id: menuId } }
			);

			await menuHasLanguages.update(
				{
					languageId: languageId,
					description: description,
				},
				{
					where: {
						menuId: menuId,
					},
				}
			);
			return await menuHasLanguages.findOne({
				where: {
					menuId: menuId,
				},
				include: [
					{
						model: menusTable,
					},
					{
						model: languageTable,
					},
				],
				attributes: {
					exclude: [
						'menuId',
						'submenuId',
						'postId',
						'languageId',
					],
				},
			});
			return new Error('Server database error');
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	delMenu: async (menuId) => {
		try {
			return await menusTable.destroy({
				where: {
					id: menuId,
				},
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
