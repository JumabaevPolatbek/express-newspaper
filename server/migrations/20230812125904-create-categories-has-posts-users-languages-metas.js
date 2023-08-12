'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable(
				'categories_has_posts_users_languages_metas',
				{
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
				}
			)
			.then(() =>
				queryInterface.addColumn(
					'categories_has_posts_users_languages_metas',
					'categoryId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'categories',
							key: 'id',
						},
						onDelete: 'CASCADE',
					}
				)
			)
			.then(() =>
				queryInterface.addColumn(
					'categories_has_posts_users_languages_metas',
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
					'categories_has_posts_users_languages_metas',
					'metaId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'metas',
							key: 'id',
						},
						onDelete: 'CASCADE',
					}
				)
			)
			.then(() =>
				queryInterface.addColumn(
					'categories_has_posts_users_languages_metas',
					'languageId',
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'languages',
							key: 'id',
						},
						onDelete: 'CASCADE',
					}
				)
			);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(
			'categories_has_posts_users_languages_metas'
		);
	},
};
