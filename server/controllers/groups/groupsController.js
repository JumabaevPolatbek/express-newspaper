const {
	addGroup,
	removeGroup,
	editGroup,
} = require('./actionGroups');
const {
	getSingleGroup,
	getGroups,
	getGroupsWithUsers,
	getSingleGroupWithUsers,
} = require('./getGroups');

module.exports = {
	getGroupsController: async (req, res) => {
		try {
			const result = await getGroups();
			return res.status(200).json(result);
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
			const { groupId } = req.params;
			const result = await removeGroup(groupId);
			return res.status(200).json({
				message:
					'Group # ' + groupId + ' has removed',
			});
		} catch (error) {
			console.log(error);
		}
	},
	editGroupController: async (req, res) => {
		try {
			const { groupId } = req.params;
			const { name } = req.body;
			await editGroup(groupId, name);
			return res.status(200).json({
				message: `Group # ${groupId} changed to ${name}`,
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	},
};
