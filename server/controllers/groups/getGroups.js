const groups = require('../../models/index').groups;
const usersTable =
	require('../../models/index').users_table;
module.exports = {
	getGroups: async () => {
		try {
			return await groups.findAll();
		} catch (error) {
			console.log(error);
		}
	},
	getSingleGroup: async (groupId) => {
		try {
			return await groups.findOne({
				where: {
					id: groupId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	getGroupsWithUsers: async () => {
		try {
			return await groups.findAll({
				include: {
					model: usersTable,
					as: 'GroupsUser',
					through: {
						attributes: [],
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	getSingleGroupWithUsers: async (groupId) => {
		try {
			return await groups.findOne({
				where: {
					id: groupId,
				},
				include: {
					model: usersTable,
					as: 'GroupUser',
					through: {
						attributes: [],
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
};
