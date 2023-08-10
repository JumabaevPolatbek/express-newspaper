'use strict';

const hashPassword = require('../services/hashPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable('users_has_permissions', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				description: {
					type: Sequelize.STRING,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			})
			.then(() =>
				queryInterface.addColumn(
					'users_has_permissions',
					'userId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'users_tables',
							key: 'id',
						},
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					}
				)
			)
			.then(() =>
				queryInterface.addColumn(
					'users_has_permissions',
					'permissionId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'permissions',
							key: 'id',
						},
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					}
				)
			)
			.then(async () => {
				const user =
					await queryInterface.bulkInsert(
						'users_tables',
						[
							{
								username: 'Admin',
								password:
									hashPassword(
										'Admin@12345'
									),
								email: 'admin@email.ru',
								createdAt: new Date(),
								updatedAt: new Date(),
							},
						]
					);
				const permission =
					await queryInterface.bulkInsert(
						'permissions',
						[
							{
								is_admin: true,
								show_users: true,
								edit_users: true,
								delete_users: true,
								is_owner: true,
								createdAt: new Date(),
								updatedAt: new Date(),
							},
						]
					);
				const usersHasPermissions =
					await queryInterface.bulkInsert(
						'users_has_permissions',
						[
							{
								userId: user,
								permissionId: permission,
								createdAt: new Date(),
								updatedAt: new Date(),
							},
						]
					);
				return usersHasPermissions;
			});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(
			'users_has_permissions'
		);
	},
};
