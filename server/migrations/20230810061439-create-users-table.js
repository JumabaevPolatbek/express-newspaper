'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('users_tables', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                username: {
                    type: Sequelize.STRING(60),
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(60),
                    unique: true,
                    allowNull: false,
                },
                first_name: {
                    type: Sequelize.STRING,
                },
                last_name: {
                    type: Sequelize.STRING,
                },
                info: {
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
                queryInterface.addColumn('users_tables', 'imageId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'images',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                })
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users_tables');
    },
};
