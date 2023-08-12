const {
	addUser,
	addUserToGroup,
} = require('./actionsUsersTable');

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
			const result = await addUserToGroup(
				groupId,
				userId
			);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
};
