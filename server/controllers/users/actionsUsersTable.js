const usersTable = require('../../models/index').users_table;
const { hashPassword } = require('../../services/hashPassword');
const validationError = require('../../services/validationError');
const permissionsTable = require('../../models/index').permissions;
const usersGroup = require('../../models/index').users_has_groups;
const usersHasPermission = require('../../models/index').users_has_permissions;
const imagesTable = require('../../models/index').images;
const fs = require('fs');
module.exports = {
	addUser: async (body) => {
		try {
			const {
				username,
				password,
				email,
				permissions,
				first_name,
				last_name,
				info,
			} = body.data;

			const createdUser = await usersTable.create({
				username: username,
				password: hashPassword(password),
				email: email,
				first_name: first_name,
				last_name: last_name,
				info: info,
			});

			const createdPermissions = await permissionsTable.create({
				...permissions,
			});

			await usersHasPermission.create({
				userId: createdUser.id,
				permissionId: createdPermissions.id,
			});

			return {
				message: createdUser,
				statusCode: 200,
			};
		} catch (error) {
			const { statusCode, message, errors } = validationError(error);
			return {
				statusCode: statusCode,
				message: message,
				errors: errors,
			};
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
			const result = await usersHasPermission.findOne({
				where: {
					userId: userId,
				},
			});
			if (result !== null) {
				await usersTable.destroy({
					where: {
						id: userId,
					},
				});
				return {
					message: 'User has removed',
					statusCode: 200,
				};
			}
			return {
				message: 'User with this id does not exist',
				statusCode: 401,
			};
		} catch (error) {
			return validationError(error);
		}
	},
	editUser: async (userId, body) => {
		try {
			const resultFind = await usersTable.findOne({
				where: { id: userId },
			});
			if (resultFind !== null) {
				await usersTable.update(
					{
						first_name: body.first_name,
						last_name: body.last_name,
						info: body.info,
					},
					{
						where: {
							id: userId,
						},
					}
				);
				return {
					statusCode: 200,
					message: resultFind.username + ' has updated',
				};
			}
			return {
				statusCode: 401,
				message: 'User with this id does not exist',
			};
		} catch (error) {
			return validationError(error);
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
			const result = await usersTable.update(
				{ imageId: imageResult.id },
				{ where: { id: userId } }
			);
			return {
				message: result,
				statusCode: 200,
			};
		} catch (error) {
			const { message, statusCode, errors } = validationError(error);
			fs.unlinkSync(pathImage);
			return {
				message: message,
				statusCode: statusCode,
				errors: errors,
			};
		}
	},
	deleteImage: async (imageId) => {
		try {
			const findImage = await imagesTable.findOne({
				where: { id: imageId },
			});
			if (findImage !== null) {
				await imagesTable.destroy({
					where: {
						id: imageId,
					},
				});
				return {
					statusCode: 200,
					message: 'Image has removed',
				};
			}
			return {
				statusCode: 401,
				message: 'Image with this id does not exist',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
};
