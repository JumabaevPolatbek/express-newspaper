const menusTable = require('../../models/index').menus;
const submenuTable = require('../../models/index').submenu;
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
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    getMenuById: async (menuId, languageId) => {
        try {
            return await menusTable.findOne({
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
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
