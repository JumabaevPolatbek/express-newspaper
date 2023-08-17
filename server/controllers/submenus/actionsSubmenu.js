const submenuTable = require('../../models/index').submenu;
const menuSubmenuLangTable =
    require('../../models/index').menus_has_submenus_post_languages;
module.exports = {
    addSubmenuBindMenu: async (body) => {
        try {
            const { submenu, parentMenuId, languageId, description } = body;
            return await submenuTable.create(
                {
                    title: submenu.title,
                    slug: submenu.slug,
                    content: submenu.content,
                    submenus: {
                        menuId: parentMenuId,
                        languageId: languageId,
                        description: description,
                    },
                },
                {
                    include: [
                        {
                            model: menuSubmenuLangTable,
                            as: 'submenus',
                        },
                    ],
                }
            );
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
