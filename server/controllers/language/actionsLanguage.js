const languageTable = require('../../models/index').languages;
const validationError = require("../../services/validationError");
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
            return validationError(error)
        }
    },
    getLanguages: async () => {
        try {
            const result= await languageTable.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            return {
                statusCode:200,
                message:result
            }
        } catch (error) {
            console.log(error);
            return validationError(error);
        }
    },
    addLanguage: async (body) => {
        try {
            const result= await languageTable.create({ ...body });
            return {
                statusCode:200,
                message:result
            }
        } catch (error) {
            console.log(error);
            return validationError(error);
        }
    },
    editLanguage: async (languageId, body) => {
        try {
            const resultFind=await languageTable.findOne({where:{id:languageId}})
            if(resultFind!==null){
                await languageTable.update(
                    { ...body },
                    {
                        where: {
                            id: languageId,
                        },
                    }
                );
                return {
                    statusCode:200,
                    message:`Language id ${languageId} changed successfully`
                }
            }
            return {
                statusCode:401,
                message:'Language with this id does not exist'
            }
        } catch (error) {
            console.log(error);
            return validationError(error);
        }
    },
    delLanguage: async (languageId) => {
        try {
            const resultFind=await languageTable.findOne({where:{id:languageId}})
            if(resultFind!==null){
                await languageTable.destroy({
                    where: {
                        id: languageId,
                    },
                });
                return {
                    statusCode:200,
                    message:`Language id ${languageId} removed successfully`
                }
            }
            return {
                statusCode:401,
                message:'Language with this id does not exist'
            }
           
        } catch (error) {
            console.log(error);
            return validationError(error);
        }
    },
};
