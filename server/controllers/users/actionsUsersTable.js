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
const imagesTable = require('../../models/index').images;
module.exports = {
	addUser: async (body) => {
		try {
			const {
				username,
				password,
				email,
				permissions,
			} = body;
			const resultUser = await usersTable.create({
				username: username,
				password: hashPassword(password),
				email: email,
			});
			const permissionsResult =
				await permissionsTable.create({
					...permissions,
				});
			const permissionUser =
				await usersHasPermission.create({
					userId: resultUser.id,
					permissionId: permissionsResult.id,
				});
			return permissionUser;
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
	deleteUser: async (userId) => {
		try {
			const result = await usersHasPermission.findOne(
				{
					where: {
						userId: userId,
					},
				}
			);
			await permissionsTable.destroy({
				where: {
					id: result.permissionId,
				},
			});
			return await usersTable.destroy({
				where: {
					id: userId,
				},
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	editUser: async (userId, body) => {
		try {
			return await usersTable.update(
				{ ...body },
				{
					where: {
						id: userId,
					},
				}
			);
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	imageUpload: async (userId, pathImage) => {
		try {
			const resultUser = await usersTable.findOne({
				where: { id: userId },
			});
			const imageResult = await imagesTable.create({
				name: resultUser.username,
				path: pathImage,
			});
			return await usersTable.update(
				{ imageId: imageResult.id },
				{ where: { id: userId } }
			);
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	deleteImage: async (imageId) => {
		try {
			return await imagesTable.destroy({
				where: {
					id: imageId,
				},
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
