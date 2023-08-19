const postsTable = require('../../models/index').posts;
const imagesTable = require('../../models/index').images;
const menuHasSubmenuPostTranslate =
	require('../../models/index').menus_has_submenus_post_languages;
module.exports = {
	addPostBindMenu: async (
		req,
		otherImagesPath,
		mainImagePath
	) => {
		try {
			const { title, content, languageId } = req.body;
			const { menuId } = req.params;
			console.log(otherImagesPath);
			const imageResult = await imagesTable.create({
				name: title,
				path: mainImagePath,
			});
			return await postsTable.create(
				{
					title: title,
					content: content,
					imageId: imageResult.id,
					postOtherImagess: otherImagesPath,
					postForMenus: {
						menuId: menuId,
						languageId: languageId,
					},
				},
				{
					include: [
						imagesTable,
						{
							as: 'postForMenus',
							association:
								menuHasSubmenuPostTranslate,
						},
					],
				}
			);
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
