'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('post_has_meta', {
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
                queryInterface.addColumn('post_has_meta', 'postId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'posts',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                })
            )
            .then(() =>
                queryInterface.addColumn('post_has_meta', 'metaId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'metas',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                })
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('post_has_meta');
    },
};
