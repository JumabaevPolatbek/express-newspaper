'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('users_has_groups', {
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
                queryInterface.addColumn('users_has_groups', 'userId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users_tables',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                })
            )
            .then(() =>
                queryInterface.addColumn('users_has_groups', 'groupId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'groups',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                })
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users_has_groups');
    },
};
