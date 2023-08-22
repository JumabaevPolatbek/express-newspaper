const postsTable = require('../../models/index').posts;
const imagesTable = require('../../models/index').images;
const menuSubmenuPostTranslate =
    require('../../models/index').menus_has_submenus_post_languages;
const fs = require('fs');
const otherImagesTable = require('../../models/index').other_images;
const categoryPostTranslationTable =
    require('../../models/index').CategoryPostsTranslations;
const metaTable = require('../../models/index').meta;
module.exports = {
    addPostBindMenu: async (req, otherImagesPath, mainImagePath) => {
        try {
            var arrPath = [];
            const { title, content, languageId } = req.body;
            const { menuId } = req.params;
            const imageResult = await imagesTable.create({
                name: title,
                path: mainImagePath,
            });
            const postResult = await postsTable.create({
                title: title,
                content: content,
                imageId: imageResult.id,
            });

            const idImages = await imagesTable.bulkCreate(otherImagesPath);
            for (const element of idImages) {
                arrPath.push({ postId: postResult.id, imageId: element.id });
            }
            await otherImagesTable.bulkCreate(arrPath);
            await menuSubmenuPostTranslate.create({
                menuId: menuId,
                postId: postResult.id,
                languageId: languageId,
            });
            return await postsTable.findOne({
                where: {
                    id: postResult.id,
                },
                include: {
                    model: imagesTable,
                },
                attributes: {
                    exclude: ['imageId'],
                },
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    addPostBindCategory: async (req, otherImagesPath, mainImagePath) => {
        try {
            var arrPath = [];
            const {
                title,
                content,
                languageId,
                metaName,
                metaContent,
                userId,
            } = req.body;
            const { categoryId } = req.params;
            const imageResult = await imagesTable.create({
                name: title,
                path: mainImagePath,
            });
            const postResult = await postsTable.create({
                title: title,
                content: content,
                imageId: imageResult.id,
            });

            const idImages = await imagesTable.bulkCreate(otherImagesPath);
            for (const element of idImages) {
                arrPath.push({ postId: postResult.id, imageId: element.id });
            }
            await otherImagesTable.bulkCreate(arrPath);
            await categoryPostTranslationTable.create(
                {
                    categoryId: categoryId,
                    postId: postResult.id,
                    meta: {
                        name: metaName,
                        content: metaContent,
                    },
                    userId: userId,
                    languageId: languageId,
                },
                {
                    include: [metaTable],
                }
            );
            return await postsTable.findOne({
                where: {
                    id: postResult.id,
                },
                include: {
                    model: imagesTable,
                },
                attributes: {
                    exclude: ['imageId'],
                },
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    },
};
