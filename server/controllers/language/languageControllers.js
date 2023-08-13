const {
    addLanguage,
    editLanguage,
    delLanguage,
    getLanguages,
} = require('./actionsLanguage');

module.exports = {
    addLanguageController: async (req, res) => {
        try {
            const result = await addLanguage(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    editLanguageController: async (req, res) => {
        try {
            const { languageId } = req.params;
            await editLanguage(languageId, req.body);
            return res.status(200).json({
                message: req.body.name + ' success edit',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    delLanguageController: async (req, res) => {
        try {
            const { languageId } = req.params;
            await delLanguage(languageId);
            return res.status(200).json({
                message: 'Selected language successfully removed',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    getLanguagesController: async (req, res) => {
        try {
            const result = await getLanguages();
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
};
