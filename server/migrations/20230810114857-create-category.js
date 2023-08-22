'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('categories', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                },
                url: {
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
                queryInterface.addColumn('categories', 'languageId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'languages',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                })
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('categories');
    },
};
