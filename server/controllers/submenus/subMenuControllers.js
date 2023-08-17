const { addSubmenuBindMenu } = require('./actionsSubmenu');

module.exports = {
    addSubmenuController: async (req, res) => {
        try {
            const result = await addSubmenuBindMenu(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
};
