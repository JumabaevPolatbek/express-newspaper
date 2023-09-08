const validationError = require('../../services/validationError');
const {
    addLanguage,
    editLanguage,
    delLanguage,
    getLanguages,
    getLanguage,
} = require('./actionsLanguage');

module.exports = {
    addLanguageController: async (req, res) => {
        try {
            const {statusCode,message} = await addLanguage(req.body);
            return res.status(statusCode).json({message:message});
        } catch (error) {
            console.log(error);
            const {statusCode,message,errors}=validationError(error)
            return res.status(statusCode).json({message:message,errors:errors})
        }
    },
    editLanguageController: async (req, res) => {
        try {
            const { languageId } = req.params;
            const {statusCode,message} = await editLanguage(languageId, req.body);
            return res.status(statusCode).json({
                message:message,
            });
        } catch (error) {
            console.log(error);
            const {statusCode,message,errors}=validationError(error)
            return res.status(statusCode).json({message:message,errors:errors});
        }
    },
    delLanguageController: async (req, res) => {
        try {
            const { languageId } = req.params;
            const {statusCode,message} = await delLanguage(languageId);
            return res.status(statusCode).json({
                message: message,
            });
        } catch (error) {
            console.log(error);
            const {statusCode,message,errors}=validationError(error)
            return res.status(statusCode).json({message:message,errors:errors});
        }
    },
    getLanguagesController: async (req, res) => {
        try {
            const {statusCode,message} = await getLanguages();
            return res.status(statusCode).json({message:message});
        } catch (error) {
            console.log(error);
            const {statusCode,message,errors}=validationError(error)
            return res.status(statusCode).json({message:message,errors:errors})
        }
    },
    getLanguageController:async(req,res)=>{
        try{
            const {languageId}=req.params
            const {message,statusCode}=await getLanguage(languageId)
            return res.status(statusCode).json({message:message})
        }catch(e){
            const {statusCode,message,errors}=validationError(e)
            return res.status(statusCode).json({message:message,errors:errors})
        }
    }
};
