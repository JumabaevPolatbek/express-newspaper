'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('CategoryPostsTranslations', {
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
                    'CategoryPostsTranslations',
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
                    'CategoryPostsTranslations',
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
                    'CategoryPostsTranslations',
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
                    'CategoryPostsTranslations',
                    'userId',
                    {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                        references: {
                            model: 'users_tables',
                            key: 'id',
                        },
                        onDelete: 'SET NULL',
                    }
                )
            )
            .then(() =>
                queryInterface.addColumn(
                    'CategoryPostsTranslations',
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
        await queryInterface.dropTable('CategoryPostsTranslations');
    },
};
