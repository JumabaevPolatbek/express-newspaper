const usersPermissionsTable =
	require('../../models/index').users_has_permissions;
const usersTable =
	require('../../models/index').users_table;
const permissions =
	require('../../models/index').permissions;
const { Op } = require('sequelize');
const validationError = require('../../services/validationError');
module.exports = {
	getUsers: async () => {
		try {
			const result= await usersPermissionsTable.findAll({
				where: {
					id: {
						[Op.not]: [1],
					},
				},
				include: {
					model: usersTable,
					as: 'user',
					attributes: {
						exclude: ['password'],
					},
					include: {
						model: permissions,
						as: 'permissions',
						through: {
							attributes: [],
						},
						attributes: {
							exclude: ['is_owner'],
						},
					},
				},

				attributes: {
					exclude: ['userId', 'permissionId'],
				},
			});
			return {
				message:result,
				statusCode:200
			}
		} catch (error) {
			console.log(error);
			const {message,statusCode,errors}=validationError(error)
			return {
				message:message,
				statusCode:statusCode,
				errors:errors
			}
		}
	},
};
