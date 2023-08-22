const menusTable = require('../../models/index').menus;
const submenuTable = require('../../models/index').submenus;
const menuHasLanguages =
    require('../../models/index').menus_has_submenus_post_languages;
const languageTable = require('../../models/index').languages;
module.exports = {
    addMenuHasLanguage: async (body) => {
        try {
            return await menusTable.create({
                ...body,
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    editMenu: async (body, menuId) => {
        try {
            return await menusTable.update(
                {
                    ...body,
                },
                { where: { id: menuId } }
            );
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
    getMenus: async (languageId) => {
        try {
            return await menusTable.findAll({
                where: {
                    languageId: languageId,
                },
                include: [
                    {
                        model: menuHasLanguages,
                        as: 'childMenus',
                        attributes: {
                            exclude: ['postId', 'languageId'],
                        },
                        // include: [
                        //     {
                        //         model: submenuTable,
                        //         attributes: {
                        //             exclude: ['languageId'],
                        //         },
                        //     },
                        // ],
                    },
                ],
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
