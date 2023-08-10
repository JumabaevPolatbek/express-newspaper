const groups = require('../../models/index').groups;
module.exports = {
	addGroup: async (name) => {
		try {
			return await groups.create({
				name: name,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} catch (error) {
			console.log(error);
		}
	},
	removeGroup: async (groupId) => {
		try {
			return await groups.destroy({
				where: {
					id: groupId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
};
