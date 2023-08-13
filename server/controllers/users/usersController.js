const {
    addUser,
    addUserToGroup,
    deleteUser,
    editUser,
} = require('./actionsUsersTable');
const { getUsers } = require('./getUsers');

module.exports = {
    addUserController: async (req, res) => {
        try {
            const result = await addUser(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    },
    addUserToGroupController: async (req, res) => {
        try {
            const { userId, groupId } = req.body;
            const result = await addUserToGroup(groupId, userId);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    },
    getUsersController: async (req, res) => {
        try {
            const result = await getUsers();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    },
    deleteUserController: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await deleteUser(userId);
            res.status(200).json({
                message: `User ${userId} deleted successfully`,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    },
    editUserController: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await editUser(userId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    },
};
