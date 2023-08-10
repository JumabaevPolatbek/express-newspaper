'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('permissions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			show_posts: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			edit_posts: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			delete_posts: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			access_cms: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			is_admin: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			show_users: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			edit_users: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			delete_users: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			is_owner: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('permissions');
	},
};
