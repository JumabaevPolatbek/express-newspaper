const languageTable = require('../../models/index').languages;

module.exports = {
    getLanguage: async (languageId) => {
        try {
            return await languageTable.findOne({
                where: {
                    id: languageId,
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getLanguages: async () => {
        try {
            return await languageTable.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    addLanguage: async (body) => {
        try {
            const [langAdd, created] = await languageTable.findOrCreate({
                where: {
                    ...body,
                },
            });
            if (created === true) {
                return langAdd;
            }
            return created;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    editLanguage: async (languageId, body) => {
        try {
            return await languageTable.update(
                { ...body },
                {
                    where: {
                        id: languageId,
                    },
                }
            );
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    delLanguage: async (languageId) => {
        try {
            return await languageTable.destroy({
                where: {
                    id: languageId,
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
