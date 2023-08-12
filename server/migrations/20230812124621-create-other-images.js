'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable('other_images', {
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
					'other_images',
					'postId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'posts',
							key: 'id',
						},
						onDelete: 'CASCADE',
					}
				)
			)
			.then(() =>
				queryInterface.addColumn(
					'other_images',
					'images',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'posts',
							key: 'id',
						},
					}
				)
			);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('other_images');
	},
};
