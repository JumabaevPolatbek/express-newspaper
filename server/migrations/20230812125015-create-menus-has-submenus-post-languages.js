'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable('menus_has_submenus_post_languages', {
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
                    'menus_has_submenus_post_languages',
                    'menuId',
                    {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'menus',
                            key: 'id',
                        },
                    }
                )
            )
            .then(() =>
                queryInterface.addColumn(
                    'menus_has_submenus_post_languages',
                    'submenuId',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'submenus',
                            key: 'id',
                        },
                        onDelete: 'SET NULL',
                    }
                )
            )
            .then(() =>
                queryInterface.addColumn(
                    'menus_has_submenus_post_languages',
                    'postId',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'posts',
                            key: 'id',
                        },
                        onDelete: 'SET NULL',
                    }
                )
            )
            .then(() =>
                queryInterface.addColumn(
                    'menus_has_submenus_post_languages',
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
        await queryInterface.dropTable('menus_has_submenus_post_languages');
    },
};
