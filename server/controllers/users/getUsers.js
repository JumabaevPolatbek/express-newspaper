const usersPermissionsTable =
	require('../../models/index').users_has_permissions;
const usersTable =
	require('../../models/index').users_table;
const permissions =
	require('../../models/index').permissions;
const { Op } = require('sequelize');
module.exports = {
	getUsers: async () => {
		try {
			return await usersPermissionsTable.findAll({
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
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
