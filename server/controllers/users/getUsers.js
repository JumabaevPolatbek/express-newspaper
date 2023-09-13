const usersPermissionsTable =
	require('../../models/index').users_has_permissions;
const usersTable = require('../../models/index').users_table;
const permissions = require('../../models/index').permissions;
const { Op } = require('sequelize');
const validationError = require('../../services/validationError');
const imageTable = require('../../models/index').images;
module.exports = {
	getUsers: async () => {
		try {
			const result = await usersTable.findAll({
				where: {
					id: {
						[Op.not]: [1],
					},
				},
				include: [
					{
						model: imageTable,
					},
					{
						model: permissions,
						as: 'permissions',
						through: {
							attributes: [],
						},
						attributes: {
							exclude: [
								'id',
								'is_owner',
								'createdAt',
								'updatedAt',
							],
						},
					},
				],
				attributes: {
					exclude: ['password', 'imageId'],
				},
			});
			return {
				message: result,
				statusCode: 200,
			};
		} catch (error) {
			console.log(error);
			const { message, statusCode, errors } = validationError(error);
			return {
				message: message,
				statusCode: statusCode,
				errors: errors,
			};
		}
	},
};
