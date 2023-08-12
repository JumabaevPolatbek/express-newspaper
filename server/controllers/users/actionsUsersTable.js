const usersTable =
	require('../../models/index').users_table;
const {
	hashPassword,
} = require('../../services/hashPassword');
const permissionsTable =
	require('../../models/index').permissions;
const usersGroup =
	require('../../models/index').users_has_groups;
const usersHasPermission =
	require('../../models/index').users_has_permissions;
module.exports = {
	addUser: async (body) => {
		try {
			// const {
			// 	username,
			// 	password,
			// 	email,
			// 	permissions,
			// } = body;
			// const resultUser = await usersTable.create({
			// 	username: username,
			// 	password: hashPassword(password),
			// 	email: email,
			// });
			// const permissionsResult =
			// 	await permissionsTable.create({
			// 		...permissions,
			// 	});
			// const permissionUser =
			// 	await usersHasPermission.create({
			// 		userId: resultUser.id,
			// 		permissionId: permissionsResult.id,
			// 	});
			// return await usersHasPermission.findOne({
			// 	where: {
			// 		id: 8,
			// 	},
			// 	include: [
			// 		{
			// 			model: usersTable,
			// 		},
			// 		{
			// 			model: permissionsTable,
			// 		},
			// 	],
			// });
			return await usersTable.findOne({
				where: {
					id: 12,
				},
				include: {
					model: permissionsTable,
					as: 'userPermissions',
					through: {
						attributes: [],
					},
				},
			});
			// console.log(permissions);
			// return permissions;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	addUserToGroup: async (groupId, userId) => {
		try {
			return await usersGroup.create({
				userId: userId,
				groupId: groupId,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
