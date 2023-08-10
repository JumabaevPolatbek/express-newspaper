'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('languages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(60),
				allowNull: false,
				unique: true,
			},
			country: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			iso_639_code: {
				type: Sequelize.STRING(3),
				allowNull: false,
				unique: true,
				validate: {
					is: {
						args: ['[A-Za-z0-9]+$', 'i'],
						msg: 'Must be English',
					},
					len: {
						args: [2, 4],
						msg: 'Invalid string length',
					},
				},
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
		await queryInterface.dropTable('languages');
	},
};
