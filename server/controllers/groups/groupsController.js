const { addGroup, removeGroup } = require('./actionGroups');
const {
	getSingleGroup,
	getGroups,
	getGroupsWithUsers,
	getSingleGroupWithUsers,
} = require('./getGroups');

module.exports = {
	getGroupsController: async (req, res) => {
		try {
			return res.status(200).json(getGroups);
		} catch (error) {
			console.log(error);
		}
	},
	getSingleGroupController: async (req, res) => {
		try {
			const { groupId } = req.body;
			const result = await getSingleGroup(groupId);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
		}
	},
	getGroupsWithUsersController: async (req, res) => {
		try {
			return res.status(200).json(getGroupsWithUsers);
		} catch (error) {
			console.log(error);
		}
	},
	getSingleGroupWithUsersController: async (req, res) => {
		try {
			const { groupId } = req.body;
			const result = await getSingleGroupWithUsers(
				groupId
			);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
		}
	},
	addGroupController: async (req, res) => {
		try {
			const { name } = req.body;
			const result = await addGroup(name);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
		}
	},
	removeGroupController: async (req, res) => {
		try {
			const { groupId } = req.body;
			const result = await removeGroup(groupId);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
		}
	},
};
