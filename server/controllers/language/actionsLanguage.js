const languageTable = require('../../models/index').languages;

module.exports = {
    getLanguage: async (languageId) => {
        try {
            const result= await languageTable.findOne({
                where: {
                    id: languageId,
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if(result!==null){
                return {
                    message:result,
                    statusCode:200
                }
            }  else {
                return {
                    message:'There is no such language in the database',
                    statusCode:203
                }
            }
            
        } catch (error) {
            console.log(error);
            return {
                message:error.message,
                statusCode:204
            }
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
            return await languageTable.create({ ...body });
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
